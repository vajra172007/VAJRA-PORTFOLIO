import ReactGA from 'react-ga4';

// Get Google Analytics Measurement ID from environment variables
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const ENABLE_ANALYTICS_IN_DEV = import.meta.env.VITE_ENABLE_ANALYTICS_IN_DEV === 'true';

/**
 * Initialize Google Analytics
 * Call this once when your app starts
 */
export const initGA = () => {
  // Only initialize if we have a valid measurement ID and conditions are met
  const shouldInitialize = GA_MEASUREMENT_ID && 
    GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && 
    typeof window !== 'undefined' &&
    (import.meta.env.PROD || ENABLE_ANALYTICS_IN_DEV);

  if (shouldInitialize) {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      // Optional: Additional configuration
      testMode: import.meta.env.DEV, // Enable test mode in development
      gtagOptions: {
        debug_mode: import.meta.env.DEV, // Enable debug mode in development
      },
    });
    
    console.log('Google Analytics initialized with ID:', GA_MEASUREMENT_ID);
  } else {
    console.log('Google Analytics not initialized:', {
      hasId: !!GA_MEASUREMENT_ID,
      validId: GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX',
      isProd: import.meta.env.PROD,
      devEnabled: ENABLE_ANALYTICS_IN_DEV,
    });
  }
};

/**
 * Track page views
 * Call this when navigating between pages
 */
export const trackPageView = (path: string, title?: string) => {
  const shouldTrack = GA_MEASUREMENT_ID && 
    GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && 
    (import.meta.env.PROD || ENABLE_ANALYTICS_IN_DEV);

  if (shouldTrack) {
    ReactGA.send({
      hitType: 'pageview',
      page: path,
      title: title || document.title,
    });
  }
};

/**
 * Track custom events
 * Use this to track user interactions
 */
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  const shouldTrack = GA_MEASUREMENT_ID && 
    GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && 
    (import.meta.env.PROD || ENABLE_ANALYTICS_IN_DEV);

  if (shouldTrack) {
    ReactGA.event({
      action,
      category,
      label,
      value,
    });
  }
};

/**
 * Track timing events (e.g., page load times, audio play duration)
 */
export const trackTiming = (category: string, variable: string, value: number, label?: string) => {
  const shouldTrack = GA_MEASUREMENT_ID && 
    GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && 
    (import.meta.env.PROD || ENABLE_ANALYTICS_IN_DEV);

  if (shouldTrack) {
    ReactGA.gtag('event', 'timing_complete', {
      name: variable,
      value: value,
      event_category: category,
      event_label: label,
    });
  }
};

/**
 * Common event trackers for your portfolio
 */
export const portfolioEvents = {
  // Navigation events
  navigateToSection: (section: string) => 
    trackEvent('navigate', 'section', section),
  
  // Audio player events
  audioPlay: (trackName: string) => 
    trackEvent('audio_play', 'media', trackName),
  
  audioPause: (trackName: string) => 
    trackEvent('audio_pause', 'media', trackName),
  
  // Contact form events
  contactFormSubmit: () => 
    trackEvent('form_submit', 'contact', 'contact_form'),
  
  contactFormError: (error: string) => 
    trackEvent('form_error', 'contact', error),
  
  // Project interactions
  projectView: (projectName: string) => 
    trackEvent('project_view', 'portfolio', projectName),
  
  projectLinkClick: (projectName: string, linkType: 'demo' | 'github') => 
    trackEvent('project_link_click', 'portfolio', `${projectName}_${linkType}`),
  
  // Social media clicks
  socialLinkClick: (platform: string) => 
    trackEvent('social_click', 'social_media', platform),
  
  // Resume/CV download 
  resumeDownload: () => {
    trackEvent('download', 'resume', 'VAJRA_Resume.pdf', 1);
  },
};

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackTiming,
  portfolioEvents,
};
