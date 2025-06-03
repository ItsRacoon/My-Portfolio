import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Environment } from '@react-three/drei';
import { Link } from 'react-scroll';
import { ChevronDown, Download, Mail } from 'lucide-react';
import FloatingLaptop from './3D/FloatingLaptop';
import AnimatedLaptop from './AnimatedLaptop';
import ErrorBoundary from './ErrorBoundary';

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100 + delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [use3D, setUse3D] = useState(() => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !prefersReducedMotion;
    }
    return true;
  });
  const [canvasError, setCanvasError] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCanvasError = () => {
    setCanvasError(true);
    setUse3D(false);
  };

  // Auto-switch to 2D if 3D is enabled but having issues
  useEffect(() => {
    if (use3D && !canvasError) {
      const timeout = setTimeout(() => {
        // If 3D is still enabled after 10 seconds but we're seeing context loss,
        // this effect will be cleaned up by the dependency array changes
      }, 10000);
      
      return () => clearTimeout(timeout);
    }
  }, [use3D, canvasError]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Parallax Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
      >
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
                Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                <TypewriterText text="Vishesh" delay={200} />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Full Stack Developer & AI Enthusiast crafting digital experiences
              that blend creativity with cutting-edge technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                to="projects"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View My Work
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <Download className="w-4 h-4" />
                Download CV
              </motion.button>
            </motion.div>

            {/* Social Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex gap-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">3+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Exp</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[600px] relative"
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
              {use3D && !canvasError ? (
                <ErrorBoundary>
                  <Suspense fallback={<AnimatedLaptop />}>
                    <Canvas
                      camera={{ position: [0, 0, 5], fov: 75 }}
                      className="rounded-2xl w-full h-full"
                      gl={{ 
                        antialias: false, // Reduce GPU load
                        alpha: true,
                        powerPreference: "default", // Use less aggressive GPU
                        preserveDrawingBuffer: false,
                        failIfMajorPerformanceCaveat: false,
                        stencil: false, // Disable stencil buffer
                        depth: true
                      }}
                      dpr={[0.5, 1.5]} // Lower pixel ratio for better performance
                      performance={{ min: 0.3, max: 1 }} // More conservative performance
                      onCreated={({ gl, scene }) => {
                        gl.setClearColor(0x000000, 0);
                        scene.background = null;
                        
                        // Handle context loss
                        const canvas = gl.domElement;
                        canvas.addEventListener('webglcontextlost', (event) => {
                          event.preventDefault();
                          console.warn('WebGL context lost, switching to 2D fallback');
                          handleCanvasError();
                        });
                      }}
                      onError={handleCanvasError}
                    >
                      <ambientLight intensity={0.8} />
                      <directionalLight position={[10, 10, 5]} intensity={0.8} />
                      <Float
                        speed={1.5}
                        rotationIntensity={0.5}
                        floatIntensity={1}
                      >
                        <FloatingLaptop />
                      </Float>
                      <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={1}
                        enableDamping
                        dampingFactor={0.05}
                      />
                    </Canvas>
                  </Suspense>
                </ErrorBoundary>
              ) : (
                <div className="relative w-full h-full">
                  <AnimatedLaptop />
                  {canvasError && (
                    <div className="absolute top-4 left-4 bg-blue-500/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                      2D Mode (Better Performance)
                    </div>
                  )}
                </div>
              )}

              {/* Toggle Button */}
              <button
                onClick={() => setUse3D(!use3D)}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm hover:bg-white/20 transition-colors z-10"
              >
                {use3D ? '2D' : '3D'}
              </button>

              {/* Animated Floating Elements */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute top-1/2 left-10 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-15 animate-float"></div>
              <div className="absolute bottom-1/3 right-20 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25 animate-pulse animation-delay-1000"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="cursor-pointer"
          >
            <ChevronDown className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;