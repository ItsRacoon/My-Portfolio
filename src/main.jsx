import './patchUseLayoutEffect';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { initPerformanceMonitoring } from './utils/webVitals';
import ReactProvider from './contexts/ReactProvider';

// Initialize performance monitoring in development only
if (process.env.NODE_ENV === 'development') {
  initPerformanceMonitoring();
}

// Ensure React is properly initialized before rendering
const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <ReactProvider>
        <App />
      </ReactProvider>
    );
  } catch (error) {
    console.error('Error rendering React application:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>Something went wrong</h2>
        <p>The application failed to load properly. Please try refreshing the page.</p>
        <pre style="text-align: left; background: #f5f5f5; padding: 10px; border-radius: 5px;">${error.message}</pre>
      </div>
    `;
  }
}