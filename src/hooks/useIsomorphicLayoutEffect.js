import { useLayoutEffect, useEffect } from 'react';

// This hook safely handles useLayoutEffect in both browser and SSR environments
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;