import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, Sphere, Cylinder, Torus } from '@react-three/drei';

const EnhancedPortfolioLaptop = () => {
  const groupRef = useRef();
  const laptopRef = useRef();
  const screenRef = useRef();
  const orb1Ref = useRef();
  const orb2Ref = useRef();
  const orb3Ref = useRef();
  const orb4Ref = useRef();
  const ringRef = useRef();
  const holoRingRef = useRef();
  const particleRefs = useRef([]);
  const { gl } = useThree();

  // Handle WebGL context loss
  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn('WebGL context lost. Attempting to restore...');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored.');
    };

    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl]);

  useFrame((state) => {
    try {
      const time = state.clock.getElapsedTime();
      
      // Enhanced main group rotation with micro-movements
      if (groupRef.current) {
        groupRef.current.rotation.y = Math.sin(time * 0.12) * 0.25 + Math.cos(time * 0.3) * 0.05;
        groupRef.current.position.y = Math.sin(time * 0.35) * 0.12 + Math.cos(time * 0.8) * 0.03;
        groupRef.current.rotation.x = Math.sin(time * 0.18) * 0.02;
      }
      
      // Premium laptop movement with sophisticated easing
      if (laptopRef.current) {
        laptopRef.current.rotation.x = Math.sin(time * 0.15) * 0.04 + Math.cos(time * 0.4) * 0.01;
        laptopRef.current.rotation.z = Math.cos(time * 0.25) * 0.025;
        laptopRef.current.position.y = Math.sin(time * 0.5) * 0.06 + Math.cos(time * 1.2) * 0.02;
      }
      
      // Dynamic screen glow with color shifts
      if (screenRef.current && screenRef.current.material) {
        const pulse = Math.sin(time * 1.2) * 0.3 + 0.6;
        const colorShift = Math.sin(time * 0.5) * 0.5 + 0.5;
        screenRef.current.material.emissiveIntensity = pulse;
        screenRef.current.material.color.setHSL(0.55 + colorShift * 0.1, 1, 0.1);
      }

      // Advanced floating orbs with orbital patterns
      if (orb1Ref.current) {
        const radius = 3.2 + Math.sin(time * 0.3) * 0.5;
        orb1Ref.current.position.x = Math.sin(time * 0.35) * radius;
        orb1Ref.current.position.y = Math.cos(time * 0.5) * 1.8 + 0.8;
        orb1Ref.current.position.z = Math.sin(time * 0.45) * 2.2;
        orb1Ref.current.rotation.y = time * 0.7;
        orb1Ref.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
      }

      if (orb2Ref.current) {
        const radius = 2.8 + Math.cos(time * 0.4) * 0.4;
        orb2Ref.current.position.x = Math.cos(time * 0.4) * radius - 1.5;
        orb2Ref.current.position.y = Math.sin(time * 0.35) * 2.2 + 0.3;
        orb2Ref.current.position.z = Math.cos(time * 0.25) * 1.9;
        orb2Ref.current.rotation.x = time * 0.5;
        orb2Ref.current.scale.setScalar(1 + Math.cos(time * 1.8) * 0.15);
      }

      if (orb3Ref.current) {
        orb3Ref.current.position.x = Math.sin(time * 0.6) * 2.5 + 0.8;
        orb3Ref.current.position.y = Math.cos(time * 0.4) * 2.8 - 0.8;
        orb3Ref.current.position.z = Math.sin(time * 0.55) * 1.8 + 1.2;
        orb3Ref.current.rotation.z = time * 0.35;
        orb3Ref.current.rotation.y = time * 0.8;
        orb3Ref.current.scale.setScalar(1 + Math.sin(time * 2.5) * 0.12);
      }

      if (orb4Ref.current) {
        const orbit = time * 0.3;
        orb4Ref.current.position.x = Math.cos(orbit) * 3.5 - 1;
        orb4Ref.current.position.y = Math.sin(time * 0.7) * 2 + 1.2;
        orb4Ref.current.position.z = Math.cos(time * 0.35) * 2.5;
        orb4Ref.current.rotation.y = time * 0.6;
      }

      // Enhanced holographic ring
      if (holoRingRef.current) {
        holoRingRef.current.rotation.x = time * 0.4 + Math.sin(time * 0.2) * 0.1;
        holoRingRef.current.rotation.y = time * 0.25;
        holoRingRef.current.position.y = Math.sin(time * 0.3) * 0.8 + 0.5;
        holoRingRef.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.05);
      }

      // Tech ring with more dynamic movement
      if (ringRef.current) {
        ringRef.current.rotation.x = time * 0.6;
        ringRef.current.rotation.y = time * 0.4;
        ringRef.current.position.y = Math.sin(time * 0.35) * 0.6 + 1;
        ringRef.current.scale.setScalar(1 + Math.cos(time * 2.2) * 0.08);
      }

      // Animate floating particles
      particleRefs.current.forEach((ref, i) => {
        if (ref.current) {
          const offset = i * 0.628;
          const radius = 5 + Math.sin(time * 0.2 + offset) * 1.5;
          ref.current.position.x = Math.sin(time * 0.15 + offset) * radius;
          ref.current.position.y = Math.cos(time * 0.12 + offset) * 3.5;
          ref.current.position.z = Math.sin(time * 0.18 + offset) * 4;
          ref.current.scale.setScalar(0.5 + Math.sin(time * 3 + offset) * 0.3);
        }
      });

    } catch (error) {
      console.warn('Animation frame error:', error);
    }
  });

  return (
    <group ref={groupRef} scale={[1.6, 1.6, 1.6]}>
      {/* Ultra-Premium Laptop */}
      <group ref={laptopRef}>
        {/* Main Laptop Base with Gradient Effect */}
        <Box args={[3.4, 0.25, 2.4]} position={[0, -0.5, 0]}>
          <meshStandardMaterial 
            color="#0a0a0a" 
            metalness={0.9}
            roughness={0.15}
          />
        </Box>
        
        {/* Sleek Accent Strip */}
        <Box args={[3.2, 0.03, 2.2]} position={[0, -0.42, 0]}>
          <meshStandardMaterial 
            color="#1a1a2e" 
            emissive="#0088ff"
            emissiveIntensity={0.4}
            metalness={0.8}
          />
        </Box>
        
        {/* Premium Glass Trackpad */}
        <Box args={[1.2, 0.02, 0.9]} position={[0, -0.41, 0.45]}>
          <meshStandardMaterial 
            color="#111111" 
            metalness={0.7}
            roughness={0.05}
            emissive="#0055aa"
            emissiveIntensity={0.2}
          />
        </Box>
        
        {/* Advanced Keyboard Layout */}
        <Box args={[2.6, 0.015, 1.4]} position={[0, -0.41, -0.3]}>
          <meshStandardMaterial 
            color="#0a0a0a" 
            emissive="#0077ff"
            emissiveIntensity={0.25}
          />
        </Box>
        
        {/* RGB Backlit Keys with Variation */}
        {Array.from({ length: 54 }, (_, i) => {
          const row = Math.floor(i / 9);
          const col = i % 9;
          const x = (col - 4) * 0.22;
          const z = (row - 3) * 0.19 - 0.25;
          const hue = (i * 15) % 360;
          return (
            <Box key={i} args={[0.18, 0.015, 0.16]} position={[x, -0.395, z]}>
              <meshStandardMaterial 
                color="#1a1a1a" 
                emissive={`hsl(${hue}, 70%, 50%)`}
                emissiveIntensity={0.5}
                metalness={0.3}
              />
            </Box>
          );
        })}
        
        {/* Ultra-Thin Screen Back */}
        <Box args={[3.2, 1.9, 0.1]} position={[0, 0.5, -1.15]} rotation={[-0.08, 0, 0]}>
          <meshStandardMaterial 
            color="#0a0a0a" 
            metalness={0.9}
            roughness={0.1}
          />
        </Box>
        
        {/* Minimal Bezel */}
        <Box args={[3.0, 1.75, 0.02]} position={[0, 0.5, -1.09]} rotation={[-0.08, 0, 0]}>
          <meshStandardMaterial color="#000000" />
        </Box>
        
        {/* High-Resolution Display */}
        <Box ref={screenRef} args={[2.8, 1.6, 0.005]} position={[0, 0.5, -1.085]} rotation={[-0.08, 0, 0]}>
          <meshStandardMaterial 
            color="#001122" 
            emissive="#00aaff" 
            emissiveIntensity={0.6}
            metalness={0.1}
          />
        </Box>
        
        {/* Dynamic Code Visualization */}
        {Array.from({ length: 18 }, (_, i) => (
          <Box 
            key={i}
            args={[Math.random() * 2.2 + 0.8, 0.06, 0.001]} 
            position={[
              (Math.random() - 0.5) * 2.5, 
              0.85 - i * 0.08, 
              -1.08
            ]} 
            rotation={[-0.08, 0, 0]}
          >
            <meshStandardMaterial 
              color={['#ff4757', '#2ed573', '#3742fa', '#ffa502', '#ff6348'][i % 5]} 
              emissive={['#ff4757', '#2ed573', '#3742fa', '#ffa502', '#ff6348'][i % 5]}
              emissiveIntensity={0.7}
            />
          </Box>
        ))}
        
        {/* Premium Brand Element */}
        <Sphere args={[0.12]} position={[0, 1.15, -1.08]}>
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#00ccff" 
            emissiveIntensity={0.6}
            metalness={0.8}
          />
        </Sphere>
        
        {/* Advanced Camera System */}
        <Sphere args={[0.035]} position={[0, 0.9, -1.075]}>
          <meshStandardMaterial 
            color="#1a1a1a" 
            emissive="#ff0055"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </group>

      {/* Enhanced Floating Tech Elements */}
      
      {/* Primary Holographic Orb */}
      <Sphere ref={orb1Ref} args={[0.25]} position={[2.8, 1.2, 0]}>
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={0.8}
          metalness={0.2}
          transparent={true}
          opacity={0.9}
        />
      </Sphere>
      
      {/* Plasma Orb */}
      <Sphere ref={orb2Ref} args={[0.18]} position={[-2.2, 0.8, 0]}>
        <meshStandardMaterial 
          color="#a855f7" 
          emissive="#a855f7" 
          emissiveIntensity={0.7}
          metalness={0.3}
        />
      </Sphere>
      
      {/* Geometric Data Cube */}
      <Box ref={orb3Ref} args={[0.3, 0.3, 0.3]} position={[1.2, -1.2, 1.5]} rotation={[0.6, 0.6, 0]}>
        <meshStandardMaterial 
          color="#ff0080" 
          emissive="#ff0080" 
          emissiveIntensity={0.6}
          metalness={0.5}
        />
      </Box>
      
      {/* Holographic Ring System */}
      <group ref={holoRingRef} position={[0, 2.5, -2]}>
        <Torus args={[1.2, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color="#00ff88" 
            emissive="#00ff88" 
            emissiveIntensity={0.8}
            transparent={true}
            opacity={0.7}
          />
        </Torus>
        <Torus args={[0.8, 0.05]} rotation={[0, Math.PI / 2, 0]}>
          <meshStandardMaterial 
            color="#ffaa00" 
            emissive="#ffaa00" 
            emissiveIntensity={0.7}
            transparent={true}
            opacity={0.8}
          />
        </Torus>
      </group>
      
      {/* Tech Ring Constellation */}
      <group ref={ringRef} position={[-2, 1.8, 0.5]}>
        {Array.from({ length: 12 }, (_, i) => (
          <Sphere key={i} args={[0.05]} position={[
            Math.sin(i * 0.524) * 1,
            Math.cos(i * 0.524) * 1,
            Math.sin(i * 0.262) * 0.3
          ]}>
            <meshStandardMaterial 
              color="#ffff00" 
              emissive="#ffff00" 
              emissiveIntensity={0.9}
              metalness={0.4}
            />
          </Sphere>
        ))}
      </group>
      
      {/* Central Energy Core */}
      <Sphere ref={orb4Ref} args={[0.15]} position={[-2, 1.8, 0.5]}>
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={0.8}
          transparent={true}
          opacity={0.9}
        />
      </Sphere>
      
      {/* Floating Particle System */}
      {Array.from({ length: 12 }, (_, i) => {
        const ref = useRef();
        particleRefs.current[i] = ref;
        return (
          <Sphere 
            key={i} 
            ref={ref}
            args={[0.04]} 
            position={[
              Math.sin(i * 0.524) * 6,
              Math.cos(i * 0.628) * 4.5,
              Math.sin(i * 0.785) * 3.5
            ]}
          >
            <meshStandardMaterial 
              color={`hsl(${200 + i * 30}, 85%, 65%)`}
              emissive={`hsl(${200 + i * 30}, 85%, 65%)`}
              emissiveIntensity={0.6}
              transparent={true}
              opacity={0.8}
            />
          </Sphere>
        );
      })}
      
      {/* Data Stream Cylinders */}
      {Array.from({ length: 6 }, (_, i) => (
        <Cylinder 
          key={i}
          args={[0.03, 0.03, 2.5]} 
          position={[
            Math.sin(i * 1.047) * 5,
            Math.cos(i * 1.047) * 4,
            Math.sin(i * 0.524) * 3
          ]}
          rotation={[i * 0.4, i * 0.3, i * 0.6]}
        >
          <meshStandardMaterial 
            color="#00d4aa" 
            emissive="#00d4aa" 
            emissiveIntensity={0.6}
            transparent={true}
            opacity={0.7}
          />
        </Cylinder>
      ))}
      
      {/* Premium Tech Accents */}
      <Box args={[0.4, 0.08, 0.4]} position={[3.5, -2.2, 1.2]} rotation={[0.3, 0.9, 0.2]}>
        <meshStandardMaterial 
          color="#e74c3c" 
          emissive="#e74c3c" 
          emissiveIntensity={0.5}
          metalness={0.6}
        />
      </Box>
      
      <Sphere args={[0.1]} position={[-3.5, 2.5, -1.5]}>
        <meshStandardMaterial 
          color="#2ecc71" 
          emissive="#2ecc71" 
          emissiveIntensity={0.6}
          metalness={0.4}
        />
      </Sphere>
      
      {/* Additional Geometric Elements */}
      <Torus args={[0.3, 0.08]} position={[2.8, -1.8, -1]} rotation={[0.5, 0.8, 0.3]}>
        <meshStandardMaterial 
          color="#ff6b35" 
          emissive="#ff6b35" 
          emissiveIntensity={0.5}
          metalness={0.5}
        />
      </Torus>
      
      <Box args={[0.15, 1.5, 0.15]} position={[-3.2, 0, 2]} rotation={[0.2, 0.4, 0.1]}>
        <meshStandardMaterial 
          color="#7209b7" 
          emissive="#7209b7" 
          emissiveIntensity={0.4}
          metalness={0.7}
        />
      </Box>
    </group>
  );
};

export default EnhancedPortfolioLaptop;