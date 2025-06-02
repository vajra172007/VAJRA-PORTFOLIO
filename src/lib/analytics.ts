import ReactGA from 'react-ga4';

// Get Google Analytics Measurement ID from environment variables
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const ENABLE_ANALYTICS_IN_DEV = import.meta.env.VITE_ENABLE_ANALYTICS_IN_DEV === 'true';

// Mobile detection utility
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (window.innerWidth <= 768);
};

// Load Google Analytics script dynamically with mobile optimizations
const loadGAScript = (measurementId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    
    script.onload = () => {      // Initialize dataLayer and gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(...args: unknown[]) {
        window.dataLayer.push(args);
      };
      
      // Basic GA4 configuration
      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        // Enhanced mobile compatibility
        send_page_view: true,
        anonymize_ip: true,
        allow_google_signals: true,
        // Use beacon transport for better mobile reliability
        transport_type: 'beacon',
        // Additional mobile optimizations
        custom_map: {
          device_type: isMobile() ? 'mobile' : 'desktop'
        }
      });
      
      console.log('✅ Google Analytics loaded successfully:', measurementId);
      resolve();
    };
    
    script.onerror = () => {
      console.error('❌ Failed to load Google Analytics script');
      reject(new Error('Failed to load GA script'));
    };
    
    document.head.appendChild(script);
  });
};

/**
 * Initialize Google Analytics with mobile support
 * Call this once when your app starts
 */
export const initGA = async () => {
  // Check if we're in a browser environment first
  if (typeof window === 'undefined') {
    return;
  }
  
  // Only initialize if we have a valid measurement ID and conditions are met
  const shouldInitialize = GA_MEASUREMENT_ID && 
    GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && 
    (import.meta.env.PROD || ENABLE_ANALYTICS_IN_DEV);

  if (!shouldInitialize) {
    console.log('🚫 Google Analytics not initialized:', {
      hasId: !!GA_MEASUREMENT_ID,
      validId: GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX',
      isProd: import.meta.env.PROD,
      devEnabled: ENABLE_ANALYTICS_IN_DEV,
      isMobile: isMobile()
    });
    return;
  }

  try {
    // Load GA script first
    await loadGAScript(GA_MEASUREMENT_ID);
    
    // Initialize ReactGA with mobile-friendly settings
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      testMode: import.meta.env.DEV,
      gtagOptions: {
        debug_mode: import.meta.env.DEV,
        anonymize_ip: true,
        transport_type: 'beacon', // Better for mobile
        allow_google_signals: true,
      },
    });
    
    // Send initial device info for debugging
    const deviceType = isMobile() ? 'mobile' : 'desktop';
    console.log(`📱 Analytics initialized for ${deviceType} device`);
    
    // Track initial device info
    trackEvent('device_info', deviceType, navigator.userAgent.slice(0, 100));
    
  } catch (error) {
    console.error('❌ Failed to initialize Google Analytics:', error);
  }
};

/**
 * Track page views with enhanced mobile compatibility
 * Call this when navigating between pages
 */
export const trackPageView = (path: string, title?: string) => {
  const shouldTrack = GA_MEASUREMENT_ID && 
    GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && 
    (import.meta.env.PROD || ENABLE_ANALYTICS_IN_DEV);

  if (shouldTrack) {
    try {
      // Use both ReactGA and direct gtag for better mobile compatibility
      ReactGA.send({
        hitType: 'pageview',
        page: path,
        title: title || document.title,
      });

      // Also send via gtag if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_title: title || document.title,
          page_location: window.location.href,
          page_path: path,
          custom_map: {
            device_type: isMobile() ? 'mobile' : 'desktop'
          }
        });
      }

      console.log('📄 Page view tracked:', { path, title, device: isMobile() ? 'mobile' : 'desktop' });
    } catch (error) {
      console.error('❌ Failed to track page view:', error);
    }
  }
};

/**
 * Track custom events with enhanced mobile support
 * Use this to track user interactions
 */
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  const shouldTrack = GA_MEASUREMENT_ID && 
    GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && 
    (import.meta.env.PROD || ENABLE_ANALYTICS_IN_DEV);

  if (shouldTrack) {
    try {
      // ReactGA event tracking
      ReactGA.event({
        action,
        category,
        label,
        value,
      });

      // Direct gtag event tracking for better mobile compatibility
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
          device_type: isMobile() ? 'mobile' : 'desktop',
          transport_type: 'beacon' // Better for mobile
        });
      }

      console.log('📊 Event tracked:', { action, category, label, value, device: isMobile() ? 'mobile' : 'desktop' });
    } catch (error) {
      console.error('❌ Failed to track event:', error);
    }
  }
};

/**
 * Track timing events with mobile optimization (e.g., page load times, audio play duration)
 */
export const trackTiming = (category: string, variable: string, value: number, label?: string) => {
  const shouldTrack = GA_MEASUREMENT_ID && 
    GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && 
    (import.meta.env.PROD || ENABLE_ANALYTICS_IN_DEV);

  if (shouldTrack) {
    try {
      // ReactGA timing
      ReactGA.gtag('event', 'timing_complete', {
        name: variable,
        value: value,
        event_category: category,
        event_label: label,
      });

      // Direct gtag timing for mobile compatibility
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: variable,
          value: value,
          event_category: category,
          event_label: label,
          device_type: isMobile() ? 'mobile' : 'desktop',
          transport_type: 'beacon'
        });
      }

      console.log('⏱️ Timing tracked:', { category, variable, value, label, device: isMobile() ? 'mobile' : 'desktop' });
    } catch (error) {
      console.error('❌ Failed to track timing:', error);
    }
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
