/**
 * HTTPS Production Deployment Configuration
 * 
 * This file provides deployment configurations for various hosting platforms
 * to enable HTTPS encryption for your portfolio.
 */

// =============================================================================
// VERCEL (Recommended for Vite + React)
// =============================================================================
// 
// 1. Push code to GitHub/GitLab/Bitbucket
// 2. Connect repository to Vercel (https://vercel.com)
// 3. HTTPS is automatic and free
// 4. Environment variables: Set in Vercel dashboard
//    - VITE_GA_MEASUREMENT_ID=G-XXXXX
//    - VITE_ENABLE_ANALYTICS_IN_DEV=true
// 5. Deploy: git push will trigger automatic deployment
//

// =============================================================================
// NETLIFY
// =============================================================================
//
// 1. Connect GitHub/GitLab/Bitbucket to Netlify (https://netlify.com)
// 2. Create netlify.toml at project root:
// 
// [build]
// command = "npm run build"
// publish = "dist"
// 
// [[headers]]
// for = "/*"
// [headers.values]
//   Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
//   X-Content-Type-Options = "nosniff"
//   X-Frame-Options = "SAMEORIGIN"
//   X-XSS-Protection = "1; mode=block"
//   Referrer-Policy = "strict-origin-when-cross-origin"
//   Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com"
// 
// 3. HTTPS is automatic and free
// 4. Deploy: git push triggers automatic deployment
//

// =============================================================================
// GITHUB PAGES
// =============================================================================
//
// 1. Enable GitHub Pages in repository settings
// 2. HTTPS is automatic for github.io domains
// 3. For custom domain: Add DNS CNAME record and enable HTTPS
// 4. Create .github/workflows/deploy.yml:
// 
// name: Deploy
// on:
//   push:
//     branches: [main]
// jobs:
//   build:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v2
//       - uses: actions/setup-node@v2
//         with:
//           node-version: '18'
//       - run: npm install
//       - run: npm run build
//       - uses: actions/upload-artifact@v2
//         with:
//           name: dist
//           path: dist
//

// =============================================================================
// NGINX (Self-hosted)
// =============================================================================
//
// 1. Install Certbot for free SSL certificates:
//    sudo apt-get install certbot python3-certbot-nginx
//
// 2. Generate certificate:
//    sudo certbot certonly --nginx -d yourdomain.com
//
// 3. Configure nginx.conf:
// 
// server {
//   listen 80;
//   server_name yourdomain.com www.yourdomain.com;
//   return 301 https://$server_name$request_uri;
// }
//
// server {
//   listen 443 ssl http2;
//   server_name yourdomain.com www.yourdomain.com;
//
//   # SSL certificates from Certbot
//   ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
//   ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
//
//   # SSL configuration
//   ssl_protocols TLSv1.2 TLSv1.3;
//   ssl_ciphers HIGH:!aNULL:!MD5;
//   ssl_prefer_server_ciphers on;
//
//   # Security headers
//   add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
//   add_header X-Content-Type-Options "nosniff";
//   add_header X-Frame-Options "SAMEORIGIN";
//   add_header X-XSS-Protection "1; mode=block";
//   add_header Referrer-Policy "strict-origin-when-cross-origin";
//
//   root /var/www/html;
//   index index.html;
//
//   location / {
//     try_files $uri $uri/ /index.html;
//   }
// }
//
// 4. Renew certificate automatically:
//    sudo systemctl enable certbot.timer
//

// =============================================================================
// APACHE (Self-hosted)
// =============================================================================
//
// 1. Enable SSL modules:
//    sudo a2enmod ssl
//    sudo a2enmod rewrite
//
// 2. Get SSL certificate from Let's Encrypt:
//    sudo apt-get install certbot python3-certbot-apache
//    sudo certbot certonly --apache -d yourdomain.com
//
// 3. Create VirtualHost configuration:
// 
// <VirtualHost *:80>
//   ServerName yourdomain.com
//   ServerAlias www.yourdomain.com
//   Redirect permanent / https://yourdomain.com/
// </VirtualHost>
//
// <VirtualHost *:443>
//   ServerName yourdomain.com
//   ServerAlias www.yourdomain.com
//
//   SSLEngine on
//   SSLCertificateFile /etc/letsencrypt/live/yourdomain.com/cert.pem
//   SSLCertificateKeyFile /etc/letsencrypt/live/yourdomain.com/privkey.pem
//   SSLCertificateChainFile /etc/letsencrypt/live/yourdomain.com/chain.pem
//
//   # Security headers
//   Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
//   Header always set X-Content-Type-Options "nosniff"
//   Header always set X-Frame-Options "SAMEORIGIN"
//   Header always set X-XSS-Protection "1; mode=block"
//   Header always set Referrer-Policy "strict-origin-when-cross-origin"
//
//   DocumentRoot /var/www/html
//   <Directory /var/www/html>
//     RewriteEngine On
//     RewriteBase /
//     RewriteRule ^index\.html$ - [L]
//     RewriteCond %{REQUEST_FILENAME} !-f
//     RewriteCond %{REQUEST_FILENAME} !-d
//     RewriteRule . /index.html [L]
//   </Directory>
// </VirtualHost>
//

// =============================================================================
// DOCKER (Any hosting with Docker support)
// =============================================================================
//
// Create Dockerfile:
// 
// FROM node:18-alpine AS builder
// WORKDIR /app
// COPY package*.json ./
// RUN npm ci
// COPY . .
// RUN npm run build
//
// FROM node:18-alpine
// RUN npm install -g serve
// WORKDIR /app
// COPY --from=builder /app/dist .
// EXPOSE 3000
// CMD ["serve", "-s", ".", "-l", "3000"]
//
// Create .dockerignore:
// node_modules
// npm-debug.log
// .git
// .gitignore
// .env
// .certs
//
// Build and run:
// docker build -t portfolio .
// docker run -p 3000:3000 portfolio
//

// =============================================================================
// LOCAL HTTPS DEVELOPMENT
// =============================================================================
//
// To use HTTPS during development:
// 
// 1. Generate self-signed certificates:
//    npm run generate-certs
//
// 2. Run dev server with HTTPS:
//    npm run dev:https
//
// Note: You'll see a browser warning about self-signed certificates
// This is normal for development. Click "Advanced" → "Proceed" in the browser
//

export default {
  // This file is for reference only - no exports needed
};
