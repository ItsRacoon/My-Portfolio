import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLaptop = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main Laptop Animation */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotateY: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10"
      >
        {/* Laptop Base */}
        <div className="w-48 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl relative">
          {/* Screen */}
          <div className="absolute -top-24 left-2 w-44 h-28 bg-gradient-to-br from-gray-700 to-gray-800 rounded-t-lg shadow-xl">
            {/* Screen Content */}
            <div className="absolute inset-2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded opacity-90 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-white text-xs font-mono"
              >
                &lt;/&gt; Portfolio
              </motion.div>
            </div>
            
            {/* Screen Reflection */}
            <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded pointer-events-none"></div>
          </div>
          
          {/* Keyboard */}
          <div className="absolute top-4 left-4 right-4 bottom-8 bg-gray-900 rounded grid grid-cols-12 gap-0.5 p-2">
            {Array.from({ length: 48 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.02,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="bg-gray-700 rounded-sm h-1"
              />
            ))}
          </div>
          
          {/* Trackpad */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gray-700 rounded border border-gray-600"></div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 40, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-10 right-10 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60"
      />

      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 60, -40, 0],
          rotate: [0, -180, -360]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-10 left-10 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full opacity-50"
      />

      <motion.div
        animate={{
          x: [0, 60, -100, 0],
          y: [0, -40, 80, 0],
          scale: [1, 1.5, 0.8, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-20 w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-40"
      />

      <motion.div
        animate={{
          x: [0, -80, 120, 0],
          y: [0, 100, -60, 0],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/3 right-20 w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-70"
      />

      {/* Loading Text */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-600 dark:text-gray-400 text-sm"
        >
          Interactive Demo
        </motion.p>
      </div>
    </div>
  );
};

export default AnimatedLaptop;