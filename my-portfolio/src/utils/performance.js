// Performance monitoring utilities for 3D components

export class PerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fps = 0;
    this.isMonitoring = false;
  }

  start() {
    this.isMonitoring = true;
    this.monitor();
  }

  stop() {
    this.isMonitoring = false;
  }

  monitor() {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    this.frameCount++;

    if (currentTime - this.lastTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      this.frameCount = 0;
      this.lastTime = currentTime;

      // Log performance warnings
      if (this.fps < 30) {
        console.warn(`Low FPS detected: ${this.fps} FPS`);
      }
    }

    requestAnimationFrame(() => this.monitor());
  }

  getFPS() {
    return this.fps;
  }
}

// Memory usage monitoring
export const getMemoryUsage = () => {
  if (performance.memory) {
    return {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) // MB
    };
  }
  return null;
};

// Texture optimization helper
export const optimizeTexture = (texture) => {
  if (!texture) return texture;
  
  // Optimize texture settings for performance
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;
  
  return texture;
};

// Geometry optimization helper
export const optimizeGeometry = (geometry) => {
  if (!geometry) return geometry;
  
  // Merge vertices and remove duplicates
  geometry.mergeVertices();
  geometry.computeVertexNormals();
  
  return geometry;
};