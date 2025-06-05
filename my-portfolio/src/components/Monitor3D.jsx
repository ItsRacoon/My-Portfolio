import React, { useRef, useEffect, useState, Suspense, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, PresentationControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import LoadingSpinner from './LoadingSpinner';

// Performance optimization: Reduce texture quality on mobile devices
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const TEXTURE_SIZE = isMobile ? 512 : 1024;

// Optimized Monitor Model Component with performance improvements
const MonitorModel = ({ scrollY }) => {
  const gltf = useGLTF('/asus.glb');
  const meshRef = useRef();
  const wallpaperTexture = useTexture('/images/wallpaper.jpg');
  
  // Use wallpaper texture directly to avoid WebGL parameter errors
  const optimizedTexture = useMemo(() => {
    if (!wallpaperTexture) return null;
    
    // Simply use the original texture without modification to avoid WebGL errors
    // The useTexture hook from drei already optimizes the texture appropriately
    return wallpaperTexture;
  }, [wallpaperTexture]);

  // Memoize material creation to avoid recreating on every render
  const materials = useMemo(() => {
    const screenMaterial = new THREE.MeshStandardMaterial({
      map: optimizedTexture,
      color: 0xffffff,
      metalness: 0.0,
      roughness: 0.1,
      transparent: false,
      opacity: 1.0
    });

    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.05, // Reduced for performance
      metalness: 0.8,
      roughness: 0.2
    });

    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e40af,
      metalness: 0.6,
      roughness: 0.3
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xc0c0c0,
      emissive: 0xffd700,
      emissiveIntensity: 0.02, // Reduced for performance
      metalness: 0.9,
      roughness: 0.1
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d1b69,
      emissive: 0xff0040,
      emissiveIntensity: 0.03, // Reduced for performance
      metalness: 0.7,
      roughness: 0.3
    });

    const defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      metalness: 0.6,
      roughness: 0.4
    });

    return {
      screen: screenMaterial,
      frame: frameMaterial,
      base: baseMaterial,
      metal: metalMaterial,
      accent: accentMaterial,
      default: defaultMaterial
    };
  }, [optimizedTexture]);

  // Memoize processed scene to avoid reprocessing on every render
  const processedScene = useMemo(() => {
    if (!gltf.scene) return null;

    const clonedScene = gltf.scene.clone();
    const firstMonitorParts = new Set([
      'Circle', 'Cube', 'Cube003_1', 'Cube003_2', 'Curve', 'Cylinder', 'Cylinder001', 
      'Cube001', 'Plane001_1', 'Plane001_2', 'Curve001', 'Curve002', 'Curve003', 
      'Curve004', 'Curve005', 'Curve006', 'Curve007', 'Curve008', 'Curve009', 
      'Curve010', 'Curve011', 'Curve012'
    ]);
    
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        // Get position and size information once
        const worldPosition = new THREE.Vector3();
        child.getWorldPosition(worldPosition);
        const bbox = new THREE.Box3().setFromObject(child);
        const size = bbox.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);
        
        // Check if this is the main monitor screen
        const isMainMonitorScreen = child.name === 'Cube003_1' && 
                                    worldPosition.x < 5 && worldPosition.z > 0;
        
        if (isMainMonitorScreen) {
          // Apply wallpaper texture to screen
          child.material = materials.screen;
          child.castShadow = false; // Disable shadows for screen to improve performance
          child.receiveShadow = true;
          
          // Optimize UV coordinates once
          if (child.geometry && child.geometry.attributes.uv) {
            const uvArray = child.geometry.attributes.uv.array;
            const uvCount = child.geometry.attributes.uv.count;
            
            if (uvCount === 4) {
              uvArray[0] = 0; uvArray[1] = 0;
              uvArray[2] = 1; uvArray[3] = 0;
              uvArray[4] = 1; uvArray[5] = 1;
              uvArray[6] = 0; uvArray[7] = 1;
            } else if (uvCount === 6) {
              uvArray[0] = 0; uvArray[1] = 0;
              uvArray[2] = 1; uvArray[3] = 0;
              uvArray[4] = 1; uvArray[5] = 1;
              uvArray[6] = 0; uvArray[7] = 0;
              uvArray[8] = 1; uvArray[9] = 1;
              uvArray[10] = 0; uvArray[11] = 1;
            }
            
            child.geometry.attributes.uv.needsUpdate = true;
          }
        }
        // Hide performance-heavy elements
        else if (maxDimension > 50 || 
                 worldPosition.y < -1.0 || child.position.y < -1.0 ||
                 worldPosition.y > 15.0 || child.position.y > 15.0 ||
                 Math.abs(worldPosition.x) > 30 || Math.abs(worldPosition.z) > 30 ||
                 child.name === 'Cube003' || child.name === 'Cube004' || 
                 child.name === 'Cube007' || child.name === 'Cube007_1' ||
                 (worldPosition.x > 5 || worldPosition.z < -5)) {
          child.visible = false;
        }
        // Apply optimized materials to visible parts
        else if (firstMonitorParts.has(child.name)) {
          if (child.name.includes('Cube003_2')) {
            child.material = materials.frame;
          } else if (child.name.includes('Cube001')) {
            child.material = materials.base;
          } else if (child.name.includes('Curve') || child.name.includes('Cylinder')) {
            child.material = materials.metal;
          } else if (child.name.includes('Circle')) {
            child.material = materials.accent;
          } else {
            child.material = materials.default;
          }
          
          child.castShadow = false; // Disable shadows for better performance
          child.receiveShadow = true;
          
          // Optimize geometry once
          if (child.geometry) {
            child.geometry.computeVertexNormals();
          }
        } else {
          child.visible = false;
        }
      }
    });

    return clonedScene;
  }, [gltf.scene, materials]);

  // Optimized animation with reduced calculations
  useFrame(useCallback((state) => {
    if (meshRef.current) {
      const scrollProgress = Math.min(scrollY / 1000, 1);
      const easeProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
      
      const initialRotationY = -0.5236; // Pre-calculated -30 degrees in radians
      meshRef.current.rotation.y = initialRotationY + (easeProgress * 1.5708); // Pre-calculated PI * 0.5
      meshRef.current.rotation.x = -(easeProgress * 0.2);
      
      meshRef.current.position.y = -2 + (easeProgress * 1.5);
      meshRef.current.position.x = easeProgress * 2.0;
      
      // Reduced floating animation frequency for better performance
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y += Math.sin(time * 0.3) * 0.05; // Reduced amplitude and frequency
    }
  }, [scrollY]));

  if (!processedScene) {
    return null;
  }

  return (
    <primitive
      ref={meshRef}
      object={processedScene}
      scale={[0.25, 0.25, 0.25]}
      position={[0, -6, 0]}
    />
  );
};

// Optimized Main Monitor3D Component with performance-focused rendering
const Monitor3D = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading for 2 seconds max

    return () => clearTimeout(timer);
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
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      <Canvas
        style={{ 
          width: '1000px',
          height: '800px',
          background: 'transparent'
        }}
        camera={{ position: [0, -1, 7], fov: 45 }}
        shadows={false} // Disabled shadows for better performance
        dpr={[1, 1.5]} // Reduced DPI for better performance
        gl={{ 
          antialias: false, // Disabled for better performance
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false
        }}
        performance={{ min: 0.5 }} // Allow frame rate to drop for better performance
      >
        {/* Simplified Lighting Setup for better performance */}
        <ambientLight intensity={0.6} color="#ffffff" />
        
        {/* Single main directional light without shadows */}
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.0} 
          color="#ffffff"
        />
        
        {/* Reduced number of fill lights */}
        <pointLight position={[-5, 2, 3]} intensity={0.3} color="#8b5cf6" />
        <pointLight position={[5, -2, -3]} intensity={0.2} color="#06b6d4" />
        
        {/* Simplified environment lighting */}
        <Environment preset="city" />
        
        {/* Simplified contact shadows with better performance */}
        <ContactShadows 
          position={[0, -6.5, 0]} 
          opacity={0.2} 
          scale={8} 
          blur={1} 
          far={2} 
        />
        
        {/* Optimized presentation controls */}
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

// Preload the GLTF model and texture for better performance
useGLTF.preload('/asus.glb');

// Add performance monitoring and error suppression in development
if (process.env.NODE_ENV === 'development') {
  // Suppress WebGL and Three.js warnings that don't affect functionality
  const originalWarn = console.warn;
  const originalError = console.error;
  
  console.warn = (...args) => {
    const message = args[0]?.toString?.() || '';
    if (message.includes('THREE.WebGLRenderer') || 
        message.includes('WebGL') || 
        message.includes('texParameter')) {
      return; // Suppress Three.js and WebGL warnings
    }
    originalWarn.apply(console, args);
  };
  
  console.error = (...args) => {
    const message = args[0]?.toString?.() || '';
    if (message.includes('WebGL: INVALID_ENUM') || 
        message.includes('texParameter')) {
      return; // Suppress WebGL texture parameter errors
    }
    originalError.apply(console, args);
  };
}

export default React.memo(Monitor3D);