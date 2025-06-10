import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl relative overflow-hidden">
          <div className="text-center p-8 relative z-10">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center animate-pulse">
              <svg className="w-16 h-16 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Interactive Demo
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Showcasing modern web development with React & Three.js
            </p>
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

export default ErrorBoundary;