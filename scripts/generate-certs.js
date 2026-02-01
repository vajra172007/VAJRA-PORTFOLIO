#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certDir = path.join(__dirname, "..", ".certs");

// Create certificates directory if it doesn't exist
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
}

const keyPath = path.join(certDir, "key.pem");
const certPath = path.join(certDir, "cert.pem");

// Check if certificates need renewal (exist and are less than 30 days from expiry)
function checkCertificateValidity() {
  if (!fs.existsSync(certPath)) return false;
  
  try {
    const certInfo = execSync(`openssl x509 -in "${certPath}" -noout -dates`, { encoding: 'utf8' });
    const expiryMatch = certInfo.match(/notAfter=(.+)/);
    if (expiryMatch) {
      const expiryDate = new Date(expiryMatch[1]);
      const now = new Date();
      const daysUntilExpiry = (expiryDate - now) / (1000 * 60 * 60 * 24);
      
      if (daysUntilExpiry > 30) {
        console.log(`✅ HTTPS certificates are valid for ${Math.floor(daysUntilExpiry)} more days`);
        console.log(`📁 Location: ${certDir}`);
        return true;
      } else {
        console.log(`⚠️  HTTPS certificates expire in ${Math.floor(daysUntilExpiry)} days - renewing...`);
      }
    }
  } catch (error) {
    console.log("🔄 Certificate validation failed - generating new ones...");
  }
  return false;
}

// Force renewal if --renew flag is passed
const forceRenewal = process.argv.includes('--renew') || process.argv.includes('-r');

if (!forceRenewal && checkCertificateValidity()) {
  process.exit(0);
}

console.log("🔐 Generating new HTTPS certificates...");

try {
  // Generate self-signed certificate valid for 1 year with stronger encryption
  const command = `openssl req -x509 -newkey rsa:4096 -keyout "${keyPath}" -out "${certPath}" -days 365 -nodes -subj "/CN=localhost/C=US/ST=Local/L=Development/O=Portfolio/OU=Development"`;
  
  execSync(command, { stdio: "inherit" });
  
  console.log("✅ HTTPS certificates generated successfully!");
  console.log(`📁 Key: ${keyPath}`);
  console.log(`📁 Cert: ${certPath}`);
  console.log("\n📝 To use HTTPS in development:");
  console.log('   Set environment variable: VITE_HTTPS=true');
  console.log('   Then run: npm run dev');
  console.log("\n🔄 To renew certificates in the future:");
  console.log('   Run: node scripts/generate-certs.js --renew');
  console.log('   Certificates will auto-renew when < 30 days remain');
  
} catch (error) {
  console.error("❌ Failed to generate certificates:");
  console.error("Make sure OpenSSL is installed on your system.");
  console.error("\nOn Windows, you can install OpenSSL via:");
  console.error("  - Git Bash (comes with Git for Windows)");
  console.error("  - Windows Subsystem for Linux (WSL)");
  console.error("  - Chocolatey: choco install openssl");
  console.error("  - Or download from: https://slproweb.com/products/Win32OpenSSL.html");
  process.exit(1);
}
