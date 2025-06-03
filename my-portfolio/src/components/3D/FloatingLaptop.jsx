import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';

const FloatingLaptop = () => {
  const groupRef = useRef();
  const laptopRef = useRef();
  const sphere1Ref = useRef();
  const sphere2Ref = useRef();
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

      // Floating spheres
      if (sphere1Ref.current) {
        sphere1Ref.current.position.x = Math.sin(time * 0.5) * 2;
        sphere1Ref.current.position.y = Math.cos(time * 0.3) * 1 + 0.5;
        sphere1Ref.current.position.z = Math.cos(time * 0.5) * 2;
      }

      if (sphere2Ref.current) {
        sphere2Ref.current.position.x = Math.cos(time * 0.4) * 1.5;
        sphere2Ref.current.position.y = Math.sin(time * 0.6) * 1.2 - 0.3;
        sphere2Ref.current.position.z = Math.sin(time * 0.4) * 1.5;
      }
    } catch (error) {
      console.warn('Animation frame error:', error);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Simple Laptop */}
      <group ref={laptopRef}>
        {/* Laptop Base */}
        <Box args={[2, 0.1, 1.5]} position={[0, -0.5, 0]}>
          <meshStandardMaterial color="#2d3748" />
        </Box>
        
        {/* Laptop Screen */}
        <Box args={[2, 1.2, 0.05]} position={[0, 0.1, -0.7]} rotation={[-0.1, 0, 0]}>
          <meshStandardMaterial color="#1a202c" />
        </Box>
        
        {/* Screen Content */}
        <Box args={[1.8, 1, 0.01]} position={[0, 0.1, -0.69]} rotation={[-0.1, 0, 0]}>
          <meshStandardMaterial 
            color="#4299e1" 
            emissive="#4299e1" 
            emissiveIntensity={0.3}
          />
        </Box>
      </group>

      {/* Floating Sphere 1 */}
      <Sphere ref={sphere1Ref} args={[0.3]} position={[2, 0, 0]}>
        <meshStandardMaterial 
          color="#ed64a6" 
          emissive="#ed64a6" 
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Floating Sphere 2 */}
      <Sphere ref={sphere2Ref} args={[0.2]} position={[-1.5, 0, 0]}>
        <meshStandardMaterial 
          color="#48bb78" 
          emissive="#48bb78" 
          emissiveIntensity={0.2}
        />
      </Sphere>
    </group>
  );
};

export default FloatingLaptop;