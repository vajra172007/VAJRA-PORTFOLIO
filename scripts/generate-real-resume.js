import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateRealResumePDF() {
  let browser;
  
  try {
    console.log('🚀 Starting PDF generation for real resume...');
      // Launch browser with better PDF rendering options
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--font-render-hinting=none'
      ]
    });
    
    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({
      width: 794,  // A4 width at 96 DPI
      height: 1123, // A4 height at 96 DPI
      deviceScaleFactor: 1
    });
    
    // Read the HTML file
    const htmlPath = path.join(__dirname, '..', 'public', 'resume-real.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    console.log('📄 Loading HTML content...');
    
    // Set content and wait for it to load
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });
    
    // Add CSS to ensure dark background prints correctly
    await page.addStyleTag({
      content: `
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        html, body {
          background: #0f172a !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `
    });    // Configure PDF options for professional look with no white borders
    const pdfOptions = {
      format: 'A4',
      printBackground: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      omitBackground: false,
      width: '210mm',
      height: '297mm'
    };
    
    console.log('📝 Generating professional PDF...');
    
    // Generate PDF
    const pdfPath = path.join(__dirname, '..', 'public', 'VAJRA_Resume.pdf');
    await page.pdf({
      path: pdfPath,
      ...pdfOptions
    });
    
    console.log('✅ PDF generated successfully!');
    console.log(`📍 File saved to: ${pdfPath}`);
    
    return pdfPath;
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the function
generateRealResumePDF()
  .then((pdfPath) => {
    console.log('🎉 Real resume PDF generation completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Failed to generate real resume PDF:', error);
    process.exit(1);
  });

export { generateRealResumePDF };
