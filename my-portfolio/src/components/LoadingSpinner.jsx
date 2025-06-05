import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 border-solid rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-600 border-solid rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="mt-4 text-center text-purple-600 font-medium">
          Loading 3D Model...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;