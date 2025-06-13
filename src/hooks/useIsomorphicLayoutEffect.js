import * as React from 'react';

// This hook safely handles useLayoutEffect in both browser and SSR environments
const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' && typeof document !== 'undefined' ? 
  React.useLayoutEffect : 
  React.useEffect;

export default useIsomorphicLayoutEffect;