/**
 * Comprehensive Security Utility Module
 * Prevents common web vulnerabilities and cyber attacks
 */

/**
 * Security Threat Prevention Module
 */

// XSS (Cross-Site Scripting) Prevention
export const preventXSS = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// CSRF (Cross-Site Request Forgery) Token Generator
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Validate URLs to prevent open redirects
export const isValidRedirectUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.origin === window.location.origin;
  } catch {
    return false;
  }
};

// SQL Injection Prevention - Sanitize inputs
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/'/g, "''")
    .replace(/"/g, '""')
    .replace(/\\/g, '\\\\')
    .replace(/\0/g, '\\0')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\x1a/g, '\\Z');
};

// Content Validation - Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Content Validation - URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Detect and prevent clickjacking attempts
export const checkFrameContext = (): boolean => {
  return window.self !== window.top;
};

/**
 * Rate Limiting - Client-side prevention of spam/DoS attempts
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the time window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length < this.maxAttempts) {
      recentAttempts.push(now);
      this.attempts.set(key, recentAttempts);
      return true;
    }
    
    this.attempts.set(key, recentAttempts);
    return false;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }

  resetAll(): void {
    this.attempts.clear();
  }
}

/**
 * Content Security Policy (CSP) Validation
 */
export const validateCSPHeaders = (): boolean => {
  const cspHeader = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  return cspHeader !== null;
};

/**
 * HTTPS Enforcement & Secure Context Detection
 */
export const getSecurityStatus = (): SecurityStatus => {
  const isSecure = window.location.protocol === 'https:';
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const hasHSTS = !!document.querySelector('meta[name="Strict-Transport-Security"]');
  const inFrame = window.self !== window.top;
  
  return {
    isSecure,
    isLocalhost,
    hasHSTS,
    inFrame,
    protocol: window.location.protocol,
    hostname: window.location.hostname,
  };
};

export interface SecurityStatus {
  isSecure: boolean;
  isLocalhost: boolean;
  hasHSTS: boolean;
  inFrame: boolean;
  protocol: string;
  hostname: string;
}

/**
 * Security Headers Verification
 */
export const verifySecurityHeaders = (): SecurityHeaders => {
  return {
    strictTransportSecurity: hasHeader('Strict-Transport-Security'),
    contentSecurityPolicy: hasHeader('Content-Security-Policy'),
    xContentTypeOptions: hasHeader('X-Content-Type-Options'),
    xFrameOptions: hasHeader('X-Frame-Options'),
    xXSSProtection: hasHeader('X-XSS-Protection'),
    referrerPolicy: hasHeader('Referrer-Policy'),
    permissionsPolicy: hasHeader('Permissions-Policy'),
  };
};

export interface SecurityHeaders {
  strictTransportSecurity: boolean;
  contentSecurityPolicy: boolean;
  xContentTypeOptions: boolean;
  xFrameOptions: boolean;
  xXSSProtection: boolean;
  referrerPolicy: boolean;
  permissionsPolicy: boolean;
}

// Helper to check for header presence in meta tags
const hasHeader = (headerName: string): boolean => {
  return document.querySelector(`meta[http-equiv="${headerName}"]`) !== null ||
         document.querySelector(`meta[name="${headerName}"]`) !== null;
};

/**
 * Password Security Validation
 */
export const validatePasswordStrength = (password: string): PasswordStrength => {
  const strength = {
    score: 0,
    feedback: [] as string[],
  };

  if (!password) {
    strength.feedback.push('Password is required');
    return strength;
  }

  if (password.length >= 8) strength.score += 1;
  if (password.length >= 12) strength.score += 1;
  if (/[a-z]/.test(password)) strength.score += 1;
  if (/[A-Z]/.test(password)) strength.score += 1;
  if (/\d/.test(password)) strength.score += 1;
  if (/[!@#$%^&*]/.test(password)) strength.score += 1;

  if (password.length < 8) strength.feedback.push('Password should be at least 8 characters');
  if (!/[a-z]/.test(password)) strength.feedback.push('Add lowercase letters');
  if (!/[A-Z]/.test(password)) strength.feedback.push('Add uppercase letters');
  if (!/\d/.test(password)) strength.feedback.push('Add numbers');
  if (!/[!@#$%^&*]/.test(password)) strength.feedback.push('Add special characters');

  return strength;
};

export interface PasswordStrength {
  score: number;
  feedback: string[];
}

/**
 * Initialize Security Context on App Load
 */
export const initSecurityProtections = (): void => {
  if (typeof window === 'undefined') return;

  // Check for clickjacking attempts
  if (checkFrameContext()) {
    console.warn('⚠️ Application is running inside a frame. Potential security risk.');
  }

  // Log security status
  const securityStatus = getSecurityStatus();
  
  if (!securityStatus.isSecure && !securityStatus.isLocalhost) {
    console.error('🔴 CRITICAL: Not running over HTTPS in production!');
  } else if (securityStatus.isSecure) {
    console.log('🔒 ✅ HTTPS Secure Connection Verified');
  }

  // Verify security headers
  const headers = verifySecurityHeaders();
  console.log('🛡️ Security Headers:', {
    'Strict-Transport-Security': headers.strictTransportSecurity,
    'Content-Security-Policy': headers.contentSecurityPolicy,
    'X-Content-Type-Options': headers.xContentTypeOptions,
    'X-Frame-Options': headers.xFrameOptions,
    'X-XSS-Protection': headers.xXSSProtection,
    'Referrer-Policy': headers.referrerPolicy,
    'Permissions-Policy': headers.permissionsPolicy,
  });

  // Disable browser features that could be exploited
  disableUnsafeFeatures();
};

/**
 * Disable potentially unsafe browser features
 */
const disableUnsafeFeatures = (): void => {
  // Disable document editing features
  document.designMode = 'off';
  
  // Disable user select for sensitive content (optional)
  // document.body.style.userSelect = 'none';
};

/**
 * Security Headers Documentation
 * 
 * These headers should be set by your server:
 * 
 * 1. Strict-Transport-Security (HSTS)
 *    - Forces HTTPS for all future requests
 *    - Value: "max-age=31536000; includeSubDomains; preload"
 * 
 * 2. Content-Security-Policy (CSP)
 *    - Prevents XSS attacks by controlling resource loading
 *    - Restricts inline scripts and eval()
 * 
 * 3. X-Content-Type-Options
 *    - Prevents MIME type sniffing
 *    - Value: "nosniff"
 * 
 * 4. X-Frame-Options
 *    - Prevents clickjacking attacks
 *    - Value: "SAMEORIGIN" or "DENY"
 * 
 * 5. X-XSS-Protection
 *    - Enables browser XSS filter
 *    - Value: "1; mode=block"
 * 
 * 6. Referrer-Policy
 *    - Controls how much referrer info is shared
 *    - Value: "strict-origin-when-cross-origin"
 * 
 * 7. Permissions-Policy
 *    - Disables unnecessary browser features
 *    - Value: "geolocation=(), microphone=(), camera=()"
 */

export default {
  preventXSS,
  generateCSRFToken,
  isValidRedirectUrl,
  sanitizeInput,
  isValidEmail,
  isValidUrl,
  checkFrameContext,
  RateLimiter,
  validateCSPHeaders,
  getSecurityStatus,
  verifySecurityHeaders,
  validatePasswordStrength,
  initSecurityProtections,
};
