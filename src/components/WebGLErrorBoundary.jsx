import React from 'react';

class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      errorType: null,
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error) {
    // Determine error type
    let errorType = 'general';
    if (error.message.includes('WebGL') || error.message.includes('context')) {
      errorType = 'webgl';
    } else if (error.message.includes('texture') || error.message.includes('GLTF')) {
      errorType = 'resource';
    }

    return { 
      hasError: true, 
      errorType 
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('WebGL Error caught by boundary:', error, errorInfo);
    
    // Log specific error details for debugging
    if (error.message.includes('WebGL')) {
      console.error('WebGL Context Error Details:', {
        message: error.message,
        stack: error.stack,
        userAgent: navigator.userAgent,
        webglSupport: this.checkWebGLSupport()
      });
    }
  }

  checkWebGLSupport = () => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  handleRetry = () => {
    if (this.state.retryCount < 3) {
      this.setState({ 
        hasError: false, 
        errorType: null,
        retryCount: this.state.retryCount + 1 
      });
    } else {
      // Force page reload as last resort
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      const { errorType, retryCount } = this.state;
      
      return (
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl relative overflow-hidden min-h-[400px]">
          <div className="text-center p-8 relative z-10 max-w-md">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center animate-pulse">
              {errorType === 'webgl' ? (
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              ) : (
                <svg className="w-16 h-16 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              {errorType === 'webgl' ? '3D Display Issue' : 'Interactive Demo'}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
              {errorType === 'webgl' 
                ? 'WebGL is not available or has encountered an issue. This may be due to hardware limitations or browser settings.'
                : errorType === 'resource'
                ? 'Failed to load 3D resources. This may be due to network issues or file size limitations.'
                : 'Showcasing modern web development with React & Three.js'
              }
            </p>

            {retryCount < 3 && (
              <button 
                onClick={this.handleRetry}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {retryCount === 0 ? 'Try Again' : `Retry (${retryCount}/3)`}
              </button>
            )}

            {retryCount >= 3 && (
              <div className="space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Multiple attempts failed. You can still explore the rest of the portfolio.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Reload Page
                </button>
              </div>
            )}
          </div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-1/2 left-10 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-15 animate-float"></div>
          <div className="absolute bottom-1/3 right-20 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25 animate-pulse animation-delay-1000"></div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary;