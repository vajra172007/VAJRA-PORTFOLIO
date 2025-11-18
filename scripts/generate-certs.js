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

// Check if certificates already exist
if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  console.log("✅ HTTPS certificates already exist at:", certDir);
  process.exit(0);
}

console.log("🔐 Generating HTTPS certificates...");

try {
  // Generate self-signed certificate valid for 365 days
  const command = `openssl req -x509 -newkey rsa:2048 -keyout "${keyPath}" -out "${certPath}" -days 365 -nodes -subj "/CN=localhost"`;
  
  execSync(command, { stdio: "inherit" });
  
  console.log("✅ HTTPS certificates generated successfully!");
  console.log(`📁 Key: ${keyPath}`);
  console.log(`📁 Cert: ${certPath}`);
  console.log("\n📝 To use HTTPS in development:");
  console.log('   Set environment variable: VITE_HTTPS=true');
  console.log('   Then run: npm run dev');
  
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
