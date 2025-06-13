import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ChevronDown, Download, Mail } from 'lucide-react';
import Monitor3D from './Monitor3D';

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
  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    console.log('Hero component mounted');
    
    // Check if device is mobile and if it's Android
    const checkDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isAndroidDevice = /android/i.test(userAgent.toLowerCase());
      
      setIsMobile(isMobileDevice || window.innerWidth < 768);
      setIsAndroid(isAndroidDevice);
    };
    
    // Initial check
    checkDevice();
    
    // Add resize listener
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    // Only add mousemove listener on non-mobile devices
    if (!isMobile) {
      const handleMouseMove = (e) => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Animated Background - Simplified for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 sm:opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 sm:opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 sm:w-80 h-60 sm:h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 sm:opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Parallax Elements - Only on desktop */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
          }}
        >
          {[...Array(30)].map((_, i) => (
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
      )}

      <div className="container mx-auto px-4 sm:px-6 py-6 md:py-12 lg:pt-24 lg:pb-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left lg:col-span-2"
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

            {/* Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6 flex justify-center lg:justify-start"
            >
              <div className="relative group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/images/profile.jpg"
                    alt="Vishesh - Full Stack Developer"
                    className="w-full h-full object-cover"
                    loading="eager"
                    onError={(e) => {
                      // Fallback to a placeholder if image doesn't exist
                      e.target.src = `https://ui-avatars.com/api/?name=Vishesh&size=200&background=3b82f6&color=ffffff&bold=true`;
                    }}
                  />
                </div>
                {/* Animated ring around profile picture - simplified for mobile */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-pulse"></div>
                <div className="absolute -inset-1 sm:-inset-2 rounded-full border border-purple-500/20 animate-ping"></div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight text-center lg:text-left"
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
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed text-center lg:text-left"
            >
              Full Stack Developer & AI Enthusiast crafting digital experiences
              that blend creativity with cutting-edge technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-xs sm:max-w-none mx-auto lg:mx-0"
            >
              <Link
                to="projects"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full sm:w-auto px-5 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 text-base sm:text-lg"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View My Work
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </Link>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center gap-2 justify-center text-base sm:text-lg"
              >
                <Download className="w-4 h-4" />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex justify-between sm:justify-start sm:gap-8 max-w-xs sm:max-w-none mx-auto lg:mx-0 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-3 sm:p-4"
            >
              <div className="text-center px-2 sm:px-4">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">20+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center px-2 sm:px-4 border-x border-gray-200 dark:border-gray-700">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">1+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Years Exp</div>
              </div>
              <div className="text-center px-2 sm:px-4">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">60+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Students</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:col-span-3 flex items-center justify-center mt-4 lg:mt-0"
          >
            {/* Fallback for Android or very small screens */}
            {(isAndroid || (isMobile && window.innerWidth < 360)) ? (
              <div className="w-full h-[220px] xs:h-[250px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center animate-pulse">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Interactive 3D Demo
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    View on desktop for full experience
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] relative overflow-visible flex items-center justify-center rounded-xl" style={{ background: 'transparent' }}>
                <Monitor3D key="hero-monitor" />
                
                {/* Optional: Add some decorative elements - hidden on small screens */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse hidden sm:block"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-ping hidden sm:block"></div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
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
            className="cursor-pointer bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-full p-2 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;