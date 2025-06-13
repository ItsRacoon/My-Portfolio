import * as React from 'react';

// This component ensures React is properly initialized
export const ReactProvider = ({ children }) => {
  // Ensure React is available
  if (!React) {
    console.error('React is not available');
    return <div>Error loading React</div>;
  }
  
  return (
    <React.StrictMode>
      {children}
    </React.StrictMode>
  );
};

export default ReactProvider;