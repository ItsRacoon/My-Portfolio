import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Add this to ensure proper React hooks handling
      jsxRuntime: 'automatic',
      fastRefresh: true,
      // Ensure proper handling of useLayoutEffect
      include: '**/*.{jsx,tsx}',
      // Explicitly set React import
      jsxImportSource: 'react',
    }),
  ],
  resolve: {
    alias: {
      // Ensure React is properly resolved
      'react': 'react',
      'react-dom': 'react-dom',
      'react-dom/client': 'react-dom/client'
    },
  },
  server: {
    host: '0.0.0.0', // This allows access from other devices on the network
    port: 5173,
    hmr: true
  },
  build: {
    // Enable code splitting and chunk optimization
    rollupOptions: {
      output: {
        // Ensure proper loading order
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: (id) => {
          // Create separate chunks for large libraries
          if (id.includes('node_modules')) {
            // Ensure React is loaded first
            if (id.includes('/react/') || id.includes('/react-dom/')) {
              return 'react-vendor';
            }
            if (id.includes('/three/')) {
              return 'three';
            }
            if (id.includes('@react-three')) {
              return 'react-three';
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('lucide-react')) {
              return 'lucide';
            }
            // Group other vendor libraries
            return 'vendor';
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
      'react',
      'react-dom',
      'react-dom/client',
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
});