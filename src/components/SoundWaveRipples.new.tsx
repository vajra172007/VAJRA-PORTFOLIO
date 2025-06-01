import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface RippleRingProps {
  radius: number;
  delay: number;
  isPlaying: boolean;
  isHovered: boolean;
}

// Simple Ripple Ring with high visibility
const RippleRing = ({ radius, delay, isPlaying, isHovered }: RippleRingProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  // Create a thick ring
  const geometry = useMemo(() => {
    return new THREE.RingGeometry(radius - 0.15, radius + 0.15, 64);
  }, [radius]);

  // Vibrant colors based on radius
  const getBaseColor = () => {
    if (radius < 1.5) return new THREE.Color(0x00ffff); // cyan
    if (radius < 2.5) return new THREE.Color(0x1e90ff); // dodger blue
    return new THREE.Color(0x8a2be2); // blue violet
  };

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.getElapsedTime();
    const wave = Math.sin(time * 2.0 + delay) * 0.5 + 0.5;
    
    if (isPlaying) {
      // Scale animation
      const scale = 1 + wave * (isHovered ? 1.0 : 0.8);
      meshRef.current.scale.setScalar(scale);
      
      // Color animation
      const baseColor = getBaseColor();
      materialRef.current.color = baseColor;
      
      // Opacity animation
      materialRef.current.opacity = wave * 0.7 + 0.3;
    } else {
      // Hide when not playing
      meshRef.current.scale.setScalar(0);
      materialRef.current.opacity = 0;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        ref={materialRef}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Simple particle system
const ParticleField = ({ isPlaying, isHovered }: { isPlaying: boolean, isHovered: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create particles in a circular arrangement
  const particles = useMemo(() => {
    const temp: Array<[number, number, number]> = [];
    const count = 24;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.5 + Math.random() * 1.5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = 0;
      temp.push([x, y, z]);
    }
    return temp;
  }, []);
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Rotate the particles
    if (isPlaying) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
    }
  });  return (
    <group ref={groupRef}>
      {particles.map((pos, i) => (
        <Particle 
          key={i} 
          position={pos} 
          isPlaying={isPlaying}
          isHovered={isHovered}
          index={i} 
        />
      ))}
    </group>
  );
};

// Individual particle
const Particle = ({ position, isPlaying, isHovered, index }: { 
  position: [number, number, number], 
  isPlaying: boolean,
  isHovered: boolean,
  index: number 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Get color based on index
  const getColor = () => {
    const colors = [
      new THREE.Color(0x00ffff), // cyan
      new THREE.Color(0x1e90ff), // dodger blue
      new THREE.Color(0x8a2be2), // blueviolet
    ];
    return colors[index % colors.length];
  };

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const [x, y, z] = position;
    
    if (isPlaying) {
      // Simple movement
      const moveFactor = isHovered ? 0.3 : 0.2;
      meshRef.current.position.x = x + Math.sin(time * 2 + index) * moveFactor;
      meshRef.current.position.y = y + Math.cos(time * 1.5 + index) * moveFactor;
      
      // Simple scale pulsing
      const scale = 1 + Math.sin(time * 3 + index) * 0.3;
      meshRef.current.scale.setScalar(scale);
    } else {
      // Hide when not playing
      meshRef.current.scale.setScalar(0);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial 
        color={getColor()}
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
};

interface SoundWaveRipplesProps {
  isPlaying: boolean;
  isHovered: boolean;
  isVajraToggled?: boolean;
}

// Main component
const SoundWaveRipples = ({ isPlaying, isHovered, isVajraToggled }: SoundWaveRipplesProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
      {/* Three.js canvas */}
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="absolute inset-0"
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%'
        }}
      >
        {/* Rings */}
        <group>
          {[0.8, 1.2, 1.6, 2.0, 2.4, 2.8, 3.2, 3.6].map((radius, index) => (
            <RippleRing
              key={radius}
              radius={radius}
              delay={index * 0.3}
              isPlaying={isPlaying}
              isHovered={isHovered}
            />
          ))}
          
          {/* Particles */}
          <ParticleField isPlaying={isPlaying} isHovered={isHovered} />
          
          {/* Light */}
          <ambientLight intensity={1.0} />
        </group>
      </Canvas>
      
      {/* CSS-based animations for fallback */}
      {isPlaying && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: 'rgba(0,255,255,0.8)',
              boxShadow: '0 0 10px rgba(0,255,255,0.5)'
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute inset-4 rounded-full border-2"
            style={{
              borderColor: 'rgba(30,144,255,0.8)',
              boxShadow: '0 0 10px rgba(30,144,255,0.5)'
            }}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          
          <motion.div
            className="absolute inset-8 rounded-full border-2"
            style={{
              borderColor: 'rgba(138,43,226,0.8)',
              boxShadow: '0 0 10px rgba(138,43,226,0.5)'
            }}
            animate={{
              scale: [1, 1.7, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      )}
    </div>
  );
};

export default SoundWaveRipples;
