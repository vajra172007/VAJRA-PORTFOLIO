/// <reference types="vite/client" />

// Google Analytics global types
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export {};
