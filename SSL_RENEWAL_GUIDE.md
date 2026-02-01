# 🔒 SSL Certificate Renewal Guide

Your SSL encryption has been **renewed and upgraded** with the latest 2026 security standards!

## ✅ What's Been Updated

### 🔄 Development Certificates (Local HTTPS)
- ✅ **Fresh certificates generated** (valid for 365 days)
- ✅ **Upgraded to RSA 4096-bit** encryption (from 2048-bit)
- ✅ **Auto-renewal system** - certificates check expiry automatically
- ✅ **Easy renewal commands** added to package.json

### 🌐 Production SSL (Vercel/Hosting)
- ✅ **HSTS extended to 2 years** (from 1 year)
- ✅ **TLS 1.3 optimized** cipher suites
- ✅ **Certificate Transparency** monitoring enabled
- ✅ **Cross-Origin security** headers added
- ✅ **Enhanced permissions policy** (blocks payment, USB access)

### 🛡️ Security Enhancements
- ✅ **OCSP Stapling** for faster certificate validation
- ✅ **Modern cipher suites** prioritizing TLS 1.3
- ✅ **Certificate validation** with 30-day expiry warnings

---

## 🚀 Quick Commands

### Check Certificate Status
```bash
npm run check-ssl
```
*Shows certificate validity and days remaining*

### Force Renew Certificates
```bash
npm run renew-ssl
```
*Generates fresh certificates immediately*

### Start HTTPS Development
```bash
npm run dev:https
```
*Runs development server with SSL enabled*

---

## 🔧 Manual Renewal Process

### For Development (Local HTTPS):
1. **Check current status**: `npm run check-ssl`
2. **If renewal needed**: `npm run renew-ssl`  
3. **Restart dev server**: `npm run dev:https`

### For Production (Vercel):
1. **Automatic renewal**: Vercel handles SSL certificates automatically
2. **Custom domain**: SSL renews automatically via Let's Encrypt
3. **No action required**: Your site will always have valid SSL

---

## ⚡ Automatic Features

### 🤖 Smart Certificate Monitoring
- Certificates are checked every time you run the script
- **Auto-warns** when certificates expire in < 30 days
- **Force renewal** available anytime with `--renew` flag

### 🔄 Future-Proof Renewal
- **365-day validity** for development certificates
- **2-year HSTS** for maximum browser trust
- **TLS 1.3 ready** for next-generation encryption

---

## 🌍 Deployment Status

### ✅ Vercel (Recommended)
- **SSL**: Automatic Let's Encrypt certificates
- **Renewal**: Handled automatically by Vercel
- **Security**: All headers configured in `vercel.json`
- **Status**: Ready for deployment

### ⚙️ Custom Server (Nginx/Apache)
- **Config**: Updated in `src/config/https-production-config.ts`
- **Certificates**: Use Let's Encrypt with certbot
- **Renewal**: Set up auto-renewal with cron job

---

## 📊 Certificate Details

| Feature | Old | New |
|---------|-----|-----|
| **Local Encryption** | RSA 2048-bit | RSA 4096-bit |
| **Validity** | 365 days | 365 days |
| **HSTS Duration** | 1 year | 2 years |
| **TLS Version** | 1.2+ | 1.3 preferred |
| **Auto-Renewal** | ❌ | ✅ |
| **Expiry Warnings** | ❌ | ✅ |

---

## 🔍 Verification Commands

### Test Local SSL:
```bash
# Start HTTPS dev server
npm run dev:https

# Visit https://localhost:5173 (accept self-signed certificate)
```

### Test Production SSL:
```bash
# Check SSL rating (after deployment)
# Visit: https://www.ssllabs.com/ssltest/
# Enter your domain name
```

---

## 🆘 Troubleshooting

### Certificate Generation Failed?
1. **Install OpenSSL**: 
   - Windows: `choco install openssl` or install Git Bash
   - macOS: `brew install openssl`
   - Linux: `sudo apt install openssl`

2. **Run renewal**: `npm run renew-ssl`

### Browser Certificate Warning?
- **Development**: Normal for self-signed certificates - click "Advanced" → "Proceed"
- **Production**: Should not happen - check domain configuration

### HTTPS Not Working?
1. **Check environment**: Ensure `VITE_HTTPS=true` is set
2. **Port conflicts**: HTTPS uses port 443 (5173 in dev)
3. **Firewall**: Allow HTTPS traffic through firewall

---

## 📅 Maintenance Schedule

### 🔄 Recommended Actions:
- **Monthly**: Run `npm run check-ssl` to verify status
- **When warned**: Renew certificates within 30 days of expiry  
- **Before deployment**: Always test HTTPS in development first
- **Quarterly**: Review security headers and update if needed

### 🚨 Emergency Renewal:
If certificates expire unexpectedly:
1. **Immediate**: `npm run renew-ssl`
2. **Restart**: All development servers
3. **Deploy**: Push changes to production
4. **Verify**: Test SSL rating and functionality

---

## 🎉 You're All Set!

Your SSL encryption is now **renewed, upgraded, and future-proofed** with:
- ✅ Strong 4096-bit encryption
- ✅ Automatic monitoring and warnings
- ✅ Industry-leading security headers
- ✅ Easy renewal process
- ✅ Production-ready configuration

**Your portfolio is now protected with enterprise-grade SSL security! 🛡️**