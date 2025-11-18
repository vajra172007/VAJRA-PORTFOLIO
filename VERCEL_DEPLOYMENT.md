# Vercel Deployment Configuration

This configuration is for zero-config deployments on Vercel with automatic HTTPS

## vercel.json

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "public": true,
  "env": {
    "VITE_GA_MEASUREMENT_ID": "@vite_ga_measurement_id",
    "VITE_ENABLE_ANALYTICS_IN_DEV": "false"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=(), payment=(), usb=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.gpteng.co; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://cdn.gpteng.co; frame-ancestors 'self'; upgrade-insecure-requests;"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/(.+)",
      "destination": "/index.html",
      "statusCode": 307
    }
  ]
}
```

## Deployment Steps on Vercel

1. **Sign up at vercel.com**

2. **Connect GitHub Repository**
   - Click "Add New..." → "Project"
   - Select your VAJRA-PORTFOLIO repository
   - Click "Import"

3. **Environment Variables Setup**
   - Go to Settings → Environment Variables
   - Add the following variables:
     - `VITE_GA_MEASUREMENT_ID` = `G-YOUR_MEASUREMENT_ID`
     - `VITE_ENABLE_ANALYTICS_IN_DEV` = `false`

4. **Deploy**
   - Vercel automatically deploys on every push to main
   - HTTPS is enabled automatically
   - Certificate renewal is automatic

5. **Verify HTTPS**
   - Your site will be available at: `https://portfolio-xxxxx.vercel.app`
   - Or with a custom domain (see Domains section)

## Vercel Security Features (Automatic)

✅ **Automatic HTTPS with free SSL/TLS certificates**
✅ **DDoS protection**
✅ **Edge caching for fast delivery**
✅ **Automatic security headers** (configured via vercel.json)
✅ **Environment variable encryption**
✅ **Security monitoring**
✅ **Automatic backups**

## Custom Domain Setup

1. **Add Custom Domain**
   - Settings → Domains
   - Enter your domain (e.g., vajra-dev.me)
   - Choose nameserver option
   - Update nameservers at your domain registrar

2. **HTTPS Certificate**
   - Vercel automatically issues Let's Encrypt certificate
   - Certificate auto-renewal is handled

## Monitoring & Logs

- **Real-time Logs**: Deployments → Select deployment → Logs
- **Error Tracking**: Deployed URLs show live errors
- **Performance Analytics**: Analytics tab shows requests/performance

## Next Steps for Perfect Security

1. Run SSL Labs test: https://www.ssllabs.com/ssltest/
2. Run Mozilla Observatory: https://observatory.mozilla.org/
3. Run Security Headers: https://securityheaders.com/
4. All should show A+ or excellent ratings

---

For self-hosted solutions, refer to `src/config/https-production-config.ts`
