import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import SoundWaveRipples from './SoundWaveRipples.new';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showClickEffect, setShowClickEffect] = useState<boolean>(false);
  const [ripples, setRipples] = useState<Array<{ id: number; timestamp: number }>>([]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    
    // Trigger click effect
    setShowClickEffect(true);
    setTimeout(() => setShowClickEffect(false), 600);
    
    // Add ripple effect
    const newRipple = { id: Date.now(), timestamp: Date.now() };
    setRipples(prev => [...prev, newRipple]);
  };

  // Clean up old ripples
  useEffect(() => {
    const interval = setInterval(() => {
      setRipples(prev => prev.filter(ripple => Date.now() - ripple.timestamp < 2000));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }; 
  
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-28 no-horizontal-scroll">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-blue-900/20 to-cyan-900/20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 w-full">
        {/* Responsive container that adapts to viewport */}
        <div className="w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-[75vw] 2xl:max-w-[70vw] mx-auto">
          <div className="flex flex-col items-center justify-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16">
            {/* TEXT CONTENT AT THE TOP */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8 px-2 sm:px-4 mt-6 sm:mt-8 md:mt-10 lg:mt-12"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold leading-tight mt-12 sm:mt-16 px-2 sm:px-0"
              >
                <span className="block text-white">Hi, I'm</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  VAJRA 
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 leading-relaxed max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto px-2 sm:px-0"
              >
                Computer Science Student & Web Developer passionate about creating innovative digital experiences
              </motion.p>
            
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col xs:flex-row sm:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center pt-2 sm:pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 255, 255, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToContact}
                  className="px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 shadow-lg text-xs xs:text-sm sm:text-base whitespace-nowrap"
                >
                  Let's Work Together
                </motion.button>
              
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 text-xs xs:text-sm sm:text-base whitespace-nowrap"
                >
                  Download Resume
                </motion.a>
              </motion.div>
            </motion.div>
            {/* VAJRA CIRCLE BELOW */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-52 xs:h-60 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] 2xl:h-[30rem] flex items-center justify-center px-4 sm:px-0 mt-4 xs:mt-6 sm:mt-8"
            >
              <div
                className="relative w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 2xl:w-80 2xl:h-80 cursor-pointer gpu-accelerate max-w-[80vw] max-h-[80vw]"
                onClick={togglePlay}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  minWidth: 'clamp(128px, 20vw, 320px)',
                  minHeight: 'clamp(128px, 20vw, 320px)',
                  maxWidth: 'min(80vw, 80vh)',
                  maxHeight: 'min(80vw, 80vh)'
                }}
              >
                <SoundWaveRipples 
                  isPlaying={isPlaying} 
                  isHovered={isHovered} 
                  isVajraToggled={false}
                />
              
                <AudioPlayer isPlaying={isPlaying} togglePlay={togglePlay} />
                {ripples.map((ripple) => (
                  <motion.div
                    key={ripple.id}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-2 border-cyan-400 pointer-events-none"
                    style={{ 
                      transformOrigin: 'center',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  />
                ))}
              
                {isPlaying && (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute inset-[-20px] rounded-full border border-cyan-400/50 pointer-events-none"
                    style={{
                      maxWidth: 'calc(100% + 40px)',
                      maxHeight: 'calc(100% + 40px)'
                    }}
                  />
                )}
              
                {showClickEffect && (
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-[-30px] rounded-full bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 pointer-events-none"
                    style={{
                      maxWidth: 'calc(100% + 60px)',
                      maxHeight: 'calc(100% + 60px)'
                    }}
                  />
                )}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className={`absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-1 shadow-2xl z-10 shadow-cyan-400/50`}
                  style={{ 
                    filter: 'brightness(1.2) drop-shadow(0 0 20px rgba(6, 182, 212, 0.6))',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                />
              
                <motion.div 
                  className="absolute inset-1 rounded-full bg-gray-900/95 backdrop-blur-sm flex items-center justify-center z-20"
                  animate={{
                    boxShadow: isPlaying 
                      ? [
                          '0 0 10px rgba(6, 182, 212, 0.15)',
                          '0 0 20px rgba(6, 182, 212, 0.3)',
                          '0 0 10px rgba(6, 182, 212, 0.15)'
                        ]
                      : '0 0 10px rgba(6, 182, 212, 0.1)'
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: isPlaying ? Infinity : 0, 
                    ease: "easeInOut" 
                  }}
                >
                  <motion.div 
                    className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                    animate={{
                      scale: showClickEffect ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    VAJRA
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-4 h-6 xs:w-5 xs:h-7 sm:w-5 sm:h-8 md:w-6 md:h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-0.5 h-1.5 xs:w-0.5 xs:h-2 sm:w-0.5 sm:h-2 md:w-1 md:h-3 bg-gray-400 rounded-full mt-1 xs:mt-1.5 sm:mt-1.5 md:mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
