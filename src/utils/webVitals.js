// Web Vitals monitoring for performance tracking (simplified version)

export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Simple performance metrics without external dependencies
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            onPerfEntry({ name: 'FCP', value: entry.startTime, unit: 'ms' });
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        onPerfEntry({ name: 'LCP', value: lastEntry.startTime, unit: 'ms' });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }
};

// Performance observer for custom metrics
export const observePerformance = () => {
  if ('PerformanceObserver' in window) {
    // Observe paint metrics
    const paintObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.startTime}ms`);
      }
    });
    paintObserver.observe({ entryTypes: ['paint'] });

    // Observe navigation metrics
    const navigationObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('Navigation timing:', {
          domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
          loadComplete: entry.loadEventEnd - entry.loadEventStart,
          totalTime: entry.loadEventEnd - entry.fetchStart
        });
      }
    });
    navigationObserver.observe({ entryTypes: ['navigation'] });

    // Observe resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.transferSize > 100000) { // Log large resources (>100KB)
          console.warn(`Large resource loaded: ${entry.name} (${Math.round(entry.transferSize / 1024)}KB)`);
        }
      }
    });
    resourceObserver.observe({ entryTypes: ['resource'] });
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  // Report web vitals to console (in production, send to analytics)
  reportWebVitals((metric) => {
    console.log(`${metric.name}: ${metric.value}${metric.unit || 'ms'}`);
    
    // In production, send to your analytics service
    // analytics.track('web-vital', metric);
  });

  // Start performance observation
  observePerformance();

  // Monitor memory usage periodically
  if (performance.memory) {
    setInterval(() => {
      const memory = {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(performance.memory.totalJSHeapSize / 1048576),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
      };
      
      if (memory.used > memory.limit * 0.8) {
        console.warn('High memory usage detected:', memory);
      }
    }, 30000); // Check every 30 seconds
  }
};