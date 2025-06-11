import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This allows access from other devices on the network
    port: 5173,
    hmr: true
  },
  build: {
    // Enable code splitting and chunk optimization
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create separate chunks for large libraries
          if (id.includes('node_modules')) {
            if (id.includes('three')) {
              return 'three'
            }
            if (id.includes('@react-three')) {
              return 'react-three'
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion'
            }
            if (id.includes('lucide-react')) {
              return 'lucide'
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            // Group other vendor libraries
            return 'vendor'
          }
        }
      }
    },
    // Enable compression and optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      }
    },
    // Increase chunk size limit to reduce warnings
    chunkSizeWarningLimit: 1500,
    // Enable source maps for better debugging (optional)
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Enable build cache
    target: 'esnext',
    // Optimize asset handling
    assetsInlineLimit: 4096
  },
  optimizeDeps: {
    include: [
      'three', 
      '@react-three/fiber', 
      '@react-three/drei', 
      'framer-motion',
      'lucide-react',
      'react-scroll',
      '@emailjs/browser'
    ],
    // Force optimization of these packages
    force: true
  },
  // Enable esbuild for faster builds
  esbuild: {
    target: 'esnext',
    minify: true
  }
})
