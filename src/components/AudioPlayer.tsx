import { useEffect, useRef, useState } from 'react';
import { portfolioEvents } from '../lib/analytics';

// Audio files
const audioFiles = [
  '/audio/Doraemon has most soothing BGM...mp3',
  '/audio/This Reminds You Of Your Childhood - Shinchan Family Theme Music - Piano Cover.mp3'
];

interface AudioPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

const AudioPlayer = ({ isPlaying, togglePlay }: AudioPlayerProps) => {
  const [volume, setVolume] = useState<number>(0.5); // Start at 50% volume
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

  // Initialize audio on component mount
  useEffect(() => {
    // Select a random audio file on component mount
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    setCurrentSongIndex(randomIndex);

    // Create audio element
    const audio = new Audio(audioFiles[randomIndex]);
    audio.volume = volume;
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      // Cleanup on component unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);
  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    const currentTrack = audioFiles[currentSongIndex];
    const trackName = currentTrack.split('/').pop()?.replace('.mp3', '') || 'Unknown Track';
    
    if (isPlaying) {
      // Track audio play event
      portfolioEvents.audioPlay(trackName);
      
      // Try to play and handle autoplay policy
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Auto-play was prevented:', error);
        });
      }
    } else {
      // Track audio pause event
      portfolioEvents.audioPause(trackName);
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);  return (
    <>

      {/* Volume Slider - Positioned below the circle */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-48 flex flex-col items-center bg-gray-800/30 backdrop-blur-sm py-2 px-3 rounded-full border border-cyan-400/20">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full h-1 appearance-none bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full outline-none slider-thumb"
          style={{
            WebkitAppearance: 'none',
          }}
        />
      </div>      <style>
        {`
          .slider-thumb::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
            transition: all 0.3s ease;
          }
          .slider-thumb::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
          }
          .slider-thumb::-webkit-slider-thumb:active {
            transform: scale(0.95);
            background: rgba(6, 182, 212, 0.9);
          }
        `}
      </style>
    </>
  );
};

export default AudioPlayer;