/**
 * HTTPS Security Middleware for Production
 * Enforces HTTPS and sets security headers
 */

/**
 * Force HTTPS redirect middleware
 * Add this to your server configuration in production
 * 
 * For Node.js/Express:
 * app.use((req, res, next) => {
 *   if (req.header('x-forwarded-proto') !== 'https') {
 *     res.redirect(`https://${req.header('host')}${req.url}`);
 *   } else {
 *     next();
 *   }
 * });
 * 
 * For Nginx configuration:
 * server {
 *   listen 80;
 *   server_name yourdomain.com;
 *   return 301 https://$server_name$request_uri;
 * }
 */

/**
 * Security headers configuration for HTTPS
 * 
 * Content-Security-Policy: Prevents XSS attacks
 * Strict-Transport-Security: Enforces HTTPS
 * X-Content-Type-Options: Prevents MIME type sniffing
 * X-Frame-Options: Prevents clickjacking
 * X-XSS-Protection: Browser XSS filter
 * Referrer-Policy: Controls referrer information
 * Permissions-Policy: Controls browser features
 */
export const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' data: https:; " +
    "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; " +
    "frame-ancestors 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self';",
};

/**
 * For Nginx/Apache configurations, add these headers:
 * 
 * add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
 * add_header X-Content-Type-Options "nosniff";
 * add_header X-Frame-Options "SAMEORIGIN";
 * add_header X-XSS-Protection "1; mode=block";
 * add_header Referrer-Policy "strict-origin-when-cross-origin";
 * add_header Permissions-Policy "geolocation=(), microphone=(), camera=()";
 */

/**
 * Verify secure context
 * Returns true if running on HTTPS
 */
export const isSecureContext = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.location.protocol === 'https:' || 
         window.location.hostname === 'localhost' ||
         window.location.hostname === '127.0.0.1';
};

/**
 * Get secure URL (enforces HTTPS in production)
 */
export const getSecureUrl = (url: string): string => {
  // If already HTTPS, return as-is
  if (url.startsWith('https://')) return url;
  
  // In production, convert HTTP to HTTPS
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  
  return url;
};

/**
 * Initialize HTTPS security checks and logging
 */
export const initSecurityContext = (): void => {
  if (typeof window === 'undefined') return;

  const isSecure = isSecureContext();
  const isDev = !window.location.hostname.includes('.com') && 
                !window.location.hostname.includes('.io') &&
                !window.location.hostname.includes('.app');

  if (!isSecure && !isDev) {
    console.warn('⚠️ Not running on secure context. HTTPS is required in production.');
  } else if (isSecure) {
    console.log('🔒 Secure context verified - HTTPS enabled');
  } else {
    console.log('🔄 Development environment - HTTP allowed');
  }

  // Log security headers status
  if (isDev) {
    console.log('📋 Security headers should be configured in production');
  }
};

export default {
  securityHeaders,
  isSecureContext,
  getSecureUrl,
  initSecurityContext,
};
