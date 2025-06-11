import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, PresentationControls, useTexture } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';

const MonitorModel = ({ scrollY }) => {
  const gltf = useGLTF('/asus.glb');
  const meshRef = useRef();
  const wallpaperTexture = useTexture('/images/wallpaper.jpg');

  // Simple animation
  useFrame((state) => {
    if (meshRef.current) {
      const scrollProgress = Math.min(scrollY / 1000, 1);
      const easeProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
      
      meshRef.current.rotation.y = -0.5 + (easeProgress * 1.5);
      meshRef.current.rotation.x = -(easeProgress * 0.2);
      
      meshRef.current.position.y = -2 + (easeProgress * 1.5);
      meshRef.current.position.x = easeProgress * 2.0;
      
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y += Math.sin(time * 0.5) * 0.1;
    }
  });

  // Apply wallpaper texture to screen when model loads
  useEffect(() => {
    if (gltf.scene && wallpaperTexture) {
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.name === 'Cube003_1') {
          // This is the screen - apply wallpaper
          child.material = new MeshStandardMaterial({
            map: wallpaperTexture,
            color: 0xffffff,
          });
        }
      });
    }
  }, [gltf.scene, wallpaperTexture]);

  if (!gltf.scene) {
    return null;
  }

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      scale={[0.25, 0.25, 0.25]}
      position={[0, -6, 0]}
    />
  );
};

const Monitor3DWorking = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="w-full h-full flex justify-center items-end"
      style={{ 
        position: 'relative',
        background: 'transparent',
        height: 'auto',
        paddingBottom: '100px',
        paddingTop: '0',
        marginTop: '0'
      }}
    >
      <Canvas
        style={{ 
          width: '1000px',
          height: '800px',
          background: 'transparent'
        }}
        camera={{ position: [0, -1, 7], fov: 45 }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.1 }}
      >
        <ambientLight intensity={0.4} color="#ffffff" />
        
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2} 
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        <pointLight position={[-5, 2, 3]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[5, -2, -3]} intensity={0.3} color="#06b6d4" />
        <pointLight position={[0, 5, 0]} intensity={0.2} color="#f59e0b" />
        
        <Environment preset="city" />
        
        <ContactShadows 
          position={[0, -6.5, 0]} 
          opacity={0.3} 
          scale={10} 
          blur={2} 
          far={2} 
        />
        
        <PresentationControls
          global
          config={{ mass: 1, tension: 300 }}
          snap={{ mass: 2, tension: 800 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 2, Math.PI / 3]}
        >
          <Suspense fallback={null}>
            <MonitorModel scrollY={scrollY} />
          </Suspense>
        </PresentationControls>
      </Canvas>
    </div>
  );
};

// Preload the GLTF model
useGLTF.preload('/asus.glb');

export default Monitor3DWorking;