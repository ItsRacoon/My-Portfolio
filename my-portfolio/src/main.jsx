import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initPerformanceMonitoring } from './utils/webVitals'

// Initialize performance monitoring
if (process.env.NODE_ENV === 'development') {
  initPerformanceMonitoring();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
