import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';

const FloatingLaptop = () => {
  const groupRef = useRef();
  const laptopRef = useRef();
  const sphere1Ref = useRef();
  const sphere2Ref = useRef();
  const extraSphere1Ref = useRef();
  const extraSphere2Ref = useRef();
  const screenRef = useRef();
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
      
      // Main group gentle rotation
      if (groupRef.current) {
        groupRef.current.rotation.y = time * 0.1;
        groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      }
      
      // Laptop gentle movement
      if (laptopRef.current) {
        laptopRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
        laptopRef.current.position.y = Math.sin(time * 0.8) * 0.1;
      }
      
      // Screen pulsing effect
      if (screenRef.current) {
        const pulse = Math.sin(time * 2) * 0.1 + 0.3;
        screenRef.current.material.emissiveIntensity = pulse;
      }

      // Floating elements with more dynamic movement
      if (sphere1Ref.current) {
        sphere1Ref.current.position.x = Math.sin(time * 0.5) * 2.5 + 2;
        sphere1Ref.current.position.y = Math.cos(time * 0.3) * 1.2 + 0.5;
        sphere1Ref.current.position.z = Math.cos(time * 0.5) * 1.5;
        sphere1Ref.current.rotation.x = time * 0.3;
        sphere1Ref.current.rotation.y = time * 0.2;
      }

      if (sphere2Ref.current) {
        sphere2Ref.current.position.x = Math.cos(time * 0.4) * 2 - 1.5;
        sphere2Ref.current.position.y = Math.sin(time * 0.6) * 1.5 - 0.3;
        sphere2Ref.current.position.z = Math.sin(time * 0.4) * 1.8;
        sphere2Ref.current.rotation.x = time * 0.4;
        sphere2Ref.current.rotation.z = time * 0.3;
      }

      // Additional floating elements
      if (extraSphere1Ref.current) {
        extraSphere1Ref.current.position.x = Math.sin(time * 0.7) * 1.5 + 1;
        extraSphere1Ref.current.position.y = Math.cos(time * 0.8) * 2 + 1.5;
        extraSphere1Ref.current.position.z = Math.cos(time * 0.6) * 1.2 + 1;
      }

      if (extraSphere2Ref.current) {
        extraSphere2Ref.current.position.x = Math.cos(time * 0.6) * 2.2 - 2;
        extraSphere2Ref.current.position.y = Math.sin(time * 0.4) * 1.8 - 1;
        extraSphere2Ref.current.position.z = Math.sin(time * 0.5) * 1.5 + 0.5;
        extraSphere2Ref.current.rotation.x = time * 0.2;
        extraSphere2Ref.current.rotation.y = time * 0.3;
        extraSphere2Ref.current.rotation.z = time * 0.1;
      }
    } catch (error) {
      console.warn('Animation frame error:', error);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Modern Laptop */}
      <group ref={laptopRef}>
        {/* Laptop Base - Main Body */}
        <Box args={[2.4, 0.12, 1.6]} position={[0, -0.5, 0]}>
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
        
        {/* Laptop Base - Bottom Rubber Feet */}
        <Box args={[2.2, 0.02, 1.4]} position={[0, -0.57, 0]}>
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </Box>
        
        {/* Trackpad */}
        <Box args={[0.8, 0.01, 0.6]} position={[0, -0.43, 0.2]}>
          <meshStandardMaterial 
            color="#2a2a2a" 
            metalness={0.3}
            roughness={0.1}
          />
        </Box>
        
        {/* Keyboard Area */}
        <Box args={[1.8, 0.005, 1]} position={[0, -0.435, -0.2]}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </Box>
        
        {/* Individual Keys (simplified) */}
        {Array.from({ length: 48 }, (_, i) => {
          const row = Math.floor(i / 12);
          const col = i % 12;
          const x = (col - 5.5) * 0.12;
          const z = (row - 1.5) * 0.12 - 0.2;
          return (
            <Box key={i} args={[0.08, 0.01, 0.08]} position={[x, -0.425, z]}>
              <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
            </Box>
          );
        })}
        
        {/* Screen Hinge */}
        <Box args={[2.2, 0.08, 0.08]} position={[0, -0.4, -0.8]}>
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.9}
            roughness={0.1}
          />
        </Box>
        
        {/* Screen Back */}
        <Box args={[2.2, 1.4, 0.08]} position={[0, 0.3, -0.84]} rotation={[-0.15, 0, 0]}>
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
        
        {/* Screen Bezel */}
        <Box args={[2.1, 1.3, 0.02]} position={[0, 0.3, -0.79]} rotation={[-0.15, 0, 0]}>
          <meshStandardMaterial color="#0a0a0a" />
        </Box>
        
        {/* Actual Screen */}
        <Box args={[1.9, 1.1, 0.01]} position={[0, 0.3, -0.78]} rotation={[-0.15, 0, 0]}>
          <meshStandardMaterial 
            color="#000000" 
            emissive="#1a365d" 
            emissiveIntensity={0.4}
          />
        </Box>
        
        {/* Screen Content - Code Editor */}
        <Box ref={screenRef} args={[1.8, 1, 0.005]} position={[0, 0.3, -0.775]} rotation={[-0.15, 0, 0]}>
          <meshStandardMaterial 
            color="#0d1117" 
            emissive="#58a6ff" 
            emissiveIntensity={0.3}
          />
        </Box>
        
        {/* Code Lines Simulation */}
        {Array.from({ length: 12 }, (_, i) => (
          <Box 
            key={i}
            args={[1.6, 0.03, 0.001]} 
            position={[0, 0.45 - i * 0.08, -0.77]} 
            rotation={[-0.15, 0, 0]}
          >
            <meshStandardMaterial 
              color={i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#22c55e" : "#3b82f6"} 
              emissive={i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#22c55e" : "#3b82f6"}
              emissiveIntensity={0.2}
            />
          </Box>
        ))}
        
        {/* Apple Logo (or brand logo) */}
        <Sphere args={[0.06]} position={[0, 0.8, -0.84]} rotation={[-0.15, 0, 0]}>
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={0.2}
          />
        </Sphere>
        
        {/* Webcam */}
        <Sphere args={[0.02]} position={[0, 0.7, -0.77]} rotation={[-0.15, 0, 0]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Sphere>
      </group>

      {/* Floating Elements - More Tech-like */}
      
      {/* Code Brackets */}
      <group ref={sphere1Ref} position={[2, 0, 0]}>
        <Box args={[0.1, 0.4, 0.05]} position={[-0.15, 0, 0]}>
          <meshStandardMaterial 
            color="#f39c12" 
            emissive="#f39c12" 
            emissiveIntensity={0.3}
          />
        </Box>
        <Box args={[0.1, 0.4, 0.05]} position={[0.15, 0, 0]}>
          <meshStandardMaterial 
            color="#f39c12" 
            emissive="#f39c12" 
            emissiveIntensity={0.3}
          />
        </Box>
        <Box args={[0.2, 0.05, 0.05]} position={[0, 0.175, 0]}>
          <meshStandardMaterial 
            color="#f39c12" 
            emissive="#f39c12" 
            emissiveIntensity={0.3}
          />
        </Box>
        <Box args={[0.2, 0.05, 0.05]} position={[0, -0.175, 0]}>
          <meshStandardMaterial 
            color="#f39c12" 
            emissive="#f39c12" 
            emissiveIntensity={0.3}
          />
        </Box>
      </group>

      {/* Geometric Shape */}
      <group ref={sphere2Ref} position={[-1.5, 0, 0]}>
        <Box args={[0.3, 0.3, 0.3]} rotation={[0.5, 0.5, 0]}>
          <meshStandardMaterial 
            color="#e74c3c" 
            emissive="#e74c3c" 
            emissiveIntensity={0.2}
            metalness={0.5}
            roughness={0.3}
          />
        </Box>
      </group>
      
      {/* Additional floating elements */}
      <Sphere ref={extraSphere1Ref} args={[0.15]} position={[1, 1.5, 1]}>
        <meshStandardMaterial 
          color="#9b59b6" 
          emissive="#9b59b6" 
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.2}
        />
      </Sphere>
      
      <Box ref={extraSphere2Ref} args={[0.2, 0.2, 0.2]} position={[-2, -1, 0.5]} rotation={[0.3, 0.3, 0.3]}>
        <meshStandardMaterial 
          color="#3498db" 
          emissive="#3498db" 
          emissiveIntensity={0.2}
          metalness={0.6}
          roughness={0.3}
        />
      </Box>
      
      {/* Particle-like elements */}
      {Array.from({ length: 8 }, (_, i) => (
        <Sphere key={i} args={[0.05]} position={[
          Math.sin(i * 0.8) * 3,
          Math.cos(i * 0.6) * 2,
          Math.sin(i * 0.4) * 2
        ]}>
          <meshStandardMaterial 
            color={`hsl(${i * 45}, 70%, 60%)`}
            emissive={`hsl(${i * 45}, 70%, 60%)`}
            emissiveIntensity={0.4}
          />
        </Sphere>
      ))}
    </group>
  );
};

export default FloatingLaptop;