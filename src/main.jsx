import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initPerformanceMonitoring } from './utils/webVitals'

// Initialize performance monitoring
if (process.env.NODE_ENV === 'development') {
  initPerformanceMonitoring();
}

// Ensure React is properly initialized before rendering
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
