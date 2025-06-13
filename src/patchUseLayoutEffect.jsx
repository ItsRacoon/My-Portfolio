// patchUseLayoutEffect.js
if (typeof window === 'undefined') {
  Object.defineProperty(require('react'), 'useLayoutEffect', {
    configurable: true,
    value: () => {},
  });
}
