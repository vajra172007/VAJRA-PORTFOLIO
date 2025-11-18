/**
 * HTTPS & Security Configuration for Production
 * Implements industry best practices for web security
 */

/**
 * NGINX Configuration with SSL/TLS and Security Headers
 * 
 * Save as: /etc/nginx/sites-available/portfolio
 */
export const NGINX_CONFIG = `
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Allow Let's Encrypt verification
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    # Redirect all other traffic to HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS Server Configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Certificate Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # SSL Session Configuration
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    
    # Modern TLS Configuration (TLS 1.2+)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # HSTS (HTTP Strict Transport Security) - Force HTTPS for 1 year
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    # Content Security Policy - Prevent XSS and injection attacks
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.gpteng.co; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://cdn.gpteng.co; frame-ancestors 'self'; upgrade-insecure-requests;" always;
    
    # Prevent MIME type sniffing
    add_header X-Content-Type-Options "nosniff" always;
    
    # Prevent Clickjacking attacks (Clickjacking/UI Redressing)
    add_header X-Frame-Options "SAMEORIGIN" always;
    
    # Enable XSS filter in browsers
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Referrer Policy - Control what referrer information is shared
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Permissions Policy - Disable unnecessary browser features
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()" always;
    
    # Remove server signature
    server_tokens off;
    
    # Disable unwanted HTTP methods
    if ($request_method !~ ^(GET|HEAD|POST|PUT|DELETE|OPTIONS)$) {
        return 405;
    }
    
    # Root directory
    root /var/www/portfolio/dist;
    index index.html index.htm;
    
    # SPA routing - serve index.html for all non-file requests
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets (with versioning)
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options "nosniff" always;
    }
    
    # Prevent access to hidden files
    location ~ /\\. {
        deny all;
    }
    
    # Prevent access to sensitive files
    location ~ ~$ {
        deny all;
    }
    
    # Gzip compression for faster delivery
    gzip on;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
    gzip_comp_level 6;
    gzip_min_length 1000;
    
    # Rate limiting (prevent DDoS)
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;
}
`;

/**
 * Apache Configuration with SSL/TLS and Security Headers
 * 
 * Save as: /etc/apache2/sites-available/portfolio.conf
 */
export const APACHE_CONFIG = `
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    
    # Allow Let's Encrypt verification
    DocumentRoot /var/www/certbot
    <Directory /var/www/certbot>
        Require all granted
    </Directory>
    
    # Redirect all traffic to HTTPS
    RewriteEngine On
    RewriteCond %{REQUEST_URI} !^/.well-known/acme-challenge/
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
</VirtualHost>

<VirtualHost *:443>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    
    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/yourdomain.com/cert.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/yourdomain.com/privkey.pem
    SSLCertificateChainFile /etc/letsencrypt/live/yourdomain.com/chain.pem
    
    # TLS Configuration
    SSLProtocol -all +TLSv1.2 +TLSv1.3
    SSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384
    SSLHonorCipherOrder on
    
    # SSL Session Cache
    SSLSessionCache shmcb:/var/cache/apache2/ssl_scache(512000)
    SSLSessionCacheTimeout 300
    
    # Document Root
    DocumentRoot /var/www/portfolio/dist
    <Directory /var/www/portfolio/dist>
        Require all granted
        
        # SPA routing
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
    
    # Security Headers
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=()"
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.gpteng.co; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://cdn.gpteng.co; frame-ancestors 'self'; upgrade-insecure-requests;"
    
    # Remove server signature
    Header always edit Set-Cookie ^(.*)$ "\$1;HttpOnly;Secure;SameSite=Strict"
    ServerTokens Prod
    
    # Disable unwanted HTTP methods
    <LimitExcept GET POST HEAD OPTIONS>
        Require all denied
    </LimitExcept>
    
    # Cache static assets
    <FilesMatch "\\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$">
        Header set Cache-Control "max-age=31536000, public"
        Header set X-Content-Type-Options "nosniff"
    </FilesMatch>
    
    # Prevent access to hidden files
    <FilesMatch "^\\.|~$">
        Require all denied
    </FilesMatch>
    
    # Gzip Compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/plain
        AddOutputFilterByType DEFLATE text/html
        AddOutputFilterByType DEFLATE text/xml
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE text/javascript
        AddOutputFilterByType DEFLATE application/xml
        AddOutputFilterByType DEFLATE application/xhtml+xml
        AddOutputFilterByType DEFLATE application/rss+xml
        AddOutputFilterByType DEFLATE application/javascript
        AddOutputFilterByType DEFLATE application/x-javascript
        AddOutputFilterByType DEFLATE application/json
    </IfModule>
    
    # Rate limiting
    <IfModule mod_ratelimit.c>
        <Location />
            SetOutputFilter RATE_LIMIT
            Rate 100000
        </Location>
    </IfModule>
    
    ErrorLog \${APACHE_LOG_DIR}/portfolio-error.log
    CustomLog \${APACHE_LOG_DIR}/portfolio-access.log combined
</VirtualHost>
`;

/**
 * Docker Compose with HTTPS (Nginx + Let's Encrypt)
 */
export const DOCKER_COMPOSE = `
version: '3.8'

services:
  portfolio:
    build: .
    container_name: portfolio-app
    ports:
      - "3000:3000"
    environment:
      - VITE_GA_MEASUREMENT_ID=G-XXXXX
      - VITE_ENABLE_ANALYTICS_IN_DEV=false
    restart: always
    networks:
      - portfolio-network

  nginx:
    image: nginx:alpine
    container_name: portfolio-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/nginx/certs:ro
      - ./certbot:/var/www/certbot:ro
    depends_on:
      - portfolio
    restart: always
    networks:
      - portfolio-network

  certbot:
    image: certbot/certbot:latest
    container_name: portfolio-certbot
    volumes:
      - ./certs:/etc/letsencrypt:rw
      - ./certbot:/var/www/certbot:rw
    entrypoint: /bin/sh -c 'trap exit TERM; while :; do certbot renew --webroot -w /var/www/certbot --quiet; sleep 12h & wait \$\${!}; done'
    restart: always
    networks:
      - portfolio-network

networks:
  portfolio-network:
    driver: bridge
`;

/**
 * Vercel Environment Setup for HTTPS
 * 
 * 1. Go to: https://vercel.com/dashboard
 * 2. Select your project
 * 3. Settings → Environment Variables
 * 4. Add:
 */
export const VERCEL_ENV_SETUP = `
VITE_GA_MEASUREMENT_ID=G-XXXXX
VITE_ENABLE_ANALYTICS_IN_DEV=false
`;

/**
 * Netlify netlify.toml for HTTPS with Security Headers
 */
export const NETLIFY_CONFIG = `
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=(), payment=()"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.gpteng.co; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://cdn.gpteng.co; upgrade-insecure-requests;"

[[headers]]
  for = "/*.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    X-Content-Type-Options = "nosniff"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;

export default {
  NGINX_CONFIG,
  APACHE_CONFIG,
  DOCKER_COMPOSE,
  VERCEL_ENV_SETUP,
  NETLIFY_CONFIG,
};
