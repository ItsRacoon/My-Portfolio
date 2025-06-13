import React, { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, PresentationControls, useTexture } from '@react-three/drei';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';
import { 
  CanvasTexture, 
  LinearFilter, 
  ClampToEdgeWrapping, 
  MeshStandardMaterial, 
  Vector3, 
  Box3 
} from 'three';

import { PerformanceMonitor, throttle, getMemoryUsage, supportsWebGL } from '../utils/performance';

// Performance optimization: Reduce texture quality on mobile devices
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const TEXTURE_SIZE = isMobile ? 512 : 1024;



// Optimized Monitor Model Component with performance improvements

const MonitorModel = ({ scrollY }) => {
  const meshRef = useRef();
  const [textureError, setTextureError] = useState(false);
  
  // Load GLTF with error handling
  const gltf = useGLTF('/asus.glb');
  
  // Handle texture loading with error recovery
  const wallpaperTexture = useTexture('/images/wallpaper.jpg', 
    (texture) => {
      // Success callback - texture loaded successfully
      setTextureError(false);
    }, 
    (error) => {
      // Error callback - texture failed to load
      console.warn('Failed to load wallpaper texture:', error);
      setTextureError(true);
    }
  );
  
  // Use wallpaper texture with fallback and optimization
  const optimizedTexture = useMemo(() => {
    if (textureError || !wallpaperTexture) {
      // Create a simple fallback texture if main texture fails
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      // Create a gradient fallback with safer settings
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#1e40af');
      gradient.addColorStop(0.5, '#3b82f6');
      gradient.addColorStop(1, '#60a5fa');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      // Add some text
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Portfolio', 256, 256);
      
      const fallbackTexture = new CanvasTexture(canvas);
      // Use safer texture settings
      fallbackTexture.generateMipmaps = false;
      fallbackTexture.minFilter = LinearFilter;
      fallbackTexture.magFilter = LinearFilter;
      fallbackTexture.wrapS = ClampToEdgeWrapping;
      fallbackTexture.wrapT = ClampToEdgeWrapping;
      fallbackTexture.flipY = false;
      fallbackTexture.needsUpdate = true;
      return fallbackTexture;
    }
    
    // Optimize the loaded texture with safer format handling
    try {
      // Don't force RGB format - let Three.js determine the best format
      wallpaperTexture.generateMipmaps = false; // Disable mipmaps to avoid format issues
      wallpaperTexture.minFilter = LinearFilter;
      wallpaperTexture.magFilter = LinearFilter;
      wallpaperTexture.wrapS = ClampToEdgeWrapping;
      wallpaperTexture.wrapT = ClampToEdgeWrapping;
      wallpaperTexture.flipY = false;
      wallpaperTexture.needsUpdate = true;
      
      return wallpaperTexture;
    } catch (error) {
      console.warn('Error optimizing texture, using fallback:', error);
      setTextureError(true);
      return null;
    }
  }, [wallpaperTexture, textureError]);

  // Memoize material creation to avoid recreating on every render
  const materials = useMemo(() => {
    // Create screen material with safer texture handling
    const screenMaterial = new MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.0,
      roughness: 0.1,
      transparent: false,
      opacity: 1.0
    });

    // Only apply texture if it's available and valid
    if (optimizedTexture && !textureError) {
      try {
        screenMaterial.map = optimizedTexture;
        screenMaterial.needsUpdate = true;
      } catch (error) {
        console.warn('Error applying texture to material:', error);
        // Keep material without texture
      }
    }

    const frameMaterial = new MeshStandardMaterial({
      color: 0x1a1a1a,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.05, // Reduced for performance
      metalness: 0.8,
      roughness: 0.2
    });

    const baseMaterial = new MeshStandardMaterial({
      color: 0x1e40af,
      metalness: 0.6,
      roughness: 0.3
    });

    const metalMaterial = new MeshStandardMaterial({
      color: 0xc0c0c0,
      emissive: 0xffd700,
      emissiveIntensity: 0.02, // Reduced for performance
      metalness: 0.9,
      roughness: 0.1
    });

    const accentMaterial = new MeshStandardMaterial({
      color: 0x2d1b69,
      emissive: 0xff0040,
      emissiveIntensity: 0.03, // Reduced for performance
      metalness: 0.7,
      roughness: 0.3
    });

    const defaultMaterial = new MeshStandardMaterial({
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
  }, [optimizedTexture, textureError]);

  // Add cleanup effect for memory management
  useEffect(() => {
    return () => {
      // Cleanup materials and geometries on unmount
      if (meshRef.current) {
        meshRef.current.traverse((child) => {
          if (child.isMesh) {
            if (child.geometry) {
              child.geometry.dispose();
            }
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(material => material.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
    };
  }, []);

  // Memoize processed scene to avoid reprocessing on every render
  const processedScene = useMemo(() => {
    if (!gltf || !gltf.scene) return null;

    const clonedScene = gltf.scene.clone();
    const firstMonitorParts = new Set([
      'Circle', 'Cube', 'Cube003_1', 'Cube003_2', 'Curve', 'Cylinder', 'Cylinder001', 
      'Cube001', 'Plane001_1', 'Plane001_2', 'Curve001', 'Curve002', 'Curve003', 
      'Curve004', 'Curve005', 'Curve006', 'Curve007', 'Curve008', 'Curve009', 
      'Curve010', 'Curve011', 'Curve012'
    ]);
    
    // For mobile, use a smaller set of essential parts for better performance
    const essentialParts = new Set([
      'Cube003_1', 'Cube003_2', 'Cube001', 'Cylinder', 'Circle'
    ]);
    
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        // Get position and size information once
        const worldPosition = new Vector3();
        child.getWorldPosition(worldPosition);
        const bbox = new Box3().setFromObject(child);
        const size = bbox.getSize(new Vector3());
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
        // On mobile, hide more elements for better performance
        else if (isMobile && !essentialParts.has(child.name)) {
          child.visible = false;
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
          child.receiveShadow = isMobile ? false : true; // Disable receiveShadow on mobile
          
          // Optimize geometry once
          if (child.geometry && !isMobile) {
            child.geometry.computeVertexNormals();
          }
        } else {
          child.visible = false;
        }
      }
    });

    return clonedScene;
  }, [gltf.scene, materials]);

  useFrame((state) => {
    if (meshRef.current) {
      const scrollProgress = Math.min(scrollY / 1000, 1);
      const easeProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
      
      meshRef.current.rotation.y = -0.5 + (easeProgress * 1.5);
      meshRef.current.rotation.x = -(easeProgress * 0.2);
      
      meshRef.current.position.y = -2 + (easeProgress * 1.5);
      meshRef.current.position.x = easeProgress * 2.0;
      
      // Reduce floating animation frequency for better performance
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y += Math.sin(time * 0.3) * 0.05;
    }
  });

  // Return null if model failed to load or process
  if (!processedScene) {
    return null;
  }

  // Adjust scale and position based on device
  const scale = isMobile ? [0.2, 0.2, 0.2] : [0.25, 0.25, 0.25];
  const position = isMobile ? [0, -4, 0] : [0, -6, 0];
  
  return (
    <primitive
      ref={meshRef}
      object={processedScene}
      scale={scale}
      position={position}
    />
  );
};

// Error boundary for Three.js component
class ThreeJSErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Three.js component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl relative overflow-hidden">
          <div className="text-center p-8 relative z-10">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              3D Interactive Demo
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Showing simplified display due to rendering limitations.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Monitor3D = React.memo(() => {
  const [scrollY, setScrollY] = useState(0);
  const [performanceMode, setPerformanceMode] = useState('auto');
  const performanceMonitor = useRef(null);

  // Initialize performance monitoring
  useEffect(() => {
    if (supportsWebGL()) {
      performanceMonitor.current = new PerformanceMonitor();
      performanceMonitor.current.start();

      // Monitor memory usage less frequently
      const memoryCheck = setInterval(() => {
        const memory = getMemoryUsage();
        if (memory && memory.used > memory.limit * 0.9) {
          console.warn('High memory usage detected:', memory);
          setPerformanceMode('low');
        }
      }, 10000); // Check every 10 seconds instead of 5

      return () => {
        if (performanceMonitor.current) {
          performanceMonitor.current.stop();
        }
        clearInterval(memoryCheck);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 16); // ~60fps throttling

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Simple fallback component for when WebGL is not supported
  const WebGLFallback = () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl relative overflow-hidden">
      <div className="text-center p-8 relative z-10">
        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center animate-pulse">
          <svg className="w-16 h-16 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          3D Interactive Demo
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          WebGL not supported. Showing fallback display.
        </p>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-1/2 left-10 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-15 animate-float"></div>
      <div className="absolute bottom-1/3 right-20 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25 animate-pulse animation-delay-1000"></div>
    </div>
  );

  // Show fallback only if WebGL is not supported at all
  if (!supportsWebGL()) {
    return <WebGLFallback />;
  }



  return (
    <div
      className="w-full h-full flex justify-center items-end"
      style={{ 
        position: 'relative',
        background: 'transparent',
        height: 'auto',
        paddingBottom: isMobile ? '50px' : '100px',
        paddingTop: '0',
        marginTop: '0'
      }}
    >
      <ThreeJSErrorBoundary>
        <Canvas
        key="monitor-canvas"
        style={{ 
          width: '100%',
          maxWidth: '1000px',
          height: isMobile ? '400px' : '800px',
          background: 'transparent'
        }}
        camera={{ position: [0, -1, isMobile ? 9 : 7], fov: isMobile ? 50 : 45 }}
        shadows={false}
        dpr={[1, isMobile ? 1.2 : 1.5]}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: false,
          stencil: false,
          depth: true
        }}
        performance={{ min: 0.5 }}
        frameloop={isMobile ? "demand" : "demand"}
        onCreated={({ gl }) => {
          try {
            // Ensure WebGL context is properly initialized
            if (gl) {
              console.log('WebGL context initialized successfully');
            }
          } catch (error) {
            console.error('Error initializing WebGL context:', error);
          }
        }}
      >

        
        <ambientLight intensity={0.4} color="#ffffff" />
        
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2} 
          color="#ffffff"
          castShadow={false}
        />
        
        <Environment preset="city" intensity={0.3} />
        
        {/* Presentation controls for interaction */}
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
      </ThreeJSErrorBoundary>
    </div>
  );
});

// Preload the GLTF model and texture for better performance
useGLTF.preload('/asus.glb');

export default Monitor3D;