import React, { useEffect, useState } from 'react';
import { portfolioEvents, trackEvent } from '../lib/analytics';

interface AnalyticsStatus {
  gaLoaded: boolean;
  gtagAvailable: boolean;
  dataLayerAvailable: boolean;
  deviceType: string;
  userAgent: string;
  screenSize: string;
  networkInfo: any;
}

const AnalyticsTestChecker = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [analyticsStatus, setAnalyticsStatus] = useState<AnalyticsStatus | null>(null);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  // Check analytics status
  const checkAnalyticsStatus = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     (window.innerWidth <= 768);
    
    const status: AnalyticsStatus = {
      gaLoaded: !!(window as any).gtag || !!(window as any).ga,
      gtagAvailable: typeof (window as any).gtag !== 'undefined',
      dataLayerAvailable: Array.isArray((window as any).dataLayer),
      deviceType: isMobile ? 'mobile' : 'desktop',
      userAgent: navigator.userAgent.slice(0, 100) + '...',
      screenSize: `${window.screen.width}x${window.screen.height} (viewport: ${window.innerWidth}x${window.innerHeight})`,
      networkInfo: (navigator as any).connection ? {
        effectiveType: (navigator as any).connection.effectiveType,
        downlink: (navigator as any).connection.downlink,
        rtt: (navigator as any).connection.rtt
      } : 'Not available'
    };
    
    setAnalyticsStatus(status);
    addResult(`📊 Analytics Status Updated - GA Loaded: ${status.gaLoaded}, Device: ${status.deviceType}`);
  };

  // Enhanced test function with mobile-specific tests
  const runAnalyticsTests = () => {
    addResult('🚀 Starting Enhanced Analytics Tests...');
    
    // Test device info tracking
    setTimeout(() => {
      trackEvent('test_device_info', analyticsStatus?.deviceType || 'unknown', navigator.userAgent.slice(0, 50));
      addResult('✅ Device info tracking test sent');
    }, 500);

    // Test navigation tracking
    setTimeout(() => {
      portfolioEvents.navigateToSection('test_section');
      addResult('✅ Navigation tracking test sent');
    }, 1000);

    // Test audio tracking
    setTimeout(() => {
      portfolioEvents.audioPlay('Test Track');
      addResult('✅ Audio play tracking test sent');
    }, 1500);

    setTimeout(() => {
      portfolioEvents.audioPause('Test Track');
      addResult('✅ Audio pause tracking test sent');
    }, 2000);

    // Test project tracking
    setTimeout(() => {
      portfolioEvents.projectView('Test Project');
      addResult('✅ Project view tracking test sent');
    }, 2500);

    setTimeout(() => {
      portfolioEvents.projectLinkClick('Test Project', 'demo');
      addResult('✅ Project link click tracking test sent');
    }, 3000);

    // Test social media tracking
    setTimeout(() => {
      portfolioEvents.socialLinkClick('test_platform');
      addResult('✅ Social media tracking test sent');
    }, 3500);

    // Test resume download tracking
    setTimeout(() => {
      portfolioEvents.resumeDownload();      addResult('✅ Resume download tracking test sent');
    }, 4000);

    // Test contact form tracking
    setTimeout(() => {
      portfolioEvents.contactFormSubmit();
      addResult('✅ Contact form submit tracking test sent');
    }, 4500);

    setTimeout(() => {
      portfolioEvents.contactFormError('Test error');
      addResult('✅ Contact form error tracking test sent');
    }, 5000);

    // Test mobile-specific events
    setTimeout(() => {
      trackEvent('mobile_compatibility_test', 'test', `${analyticsStatus?.deviceType}_${Date.now()}`);
      addResult('✅ Mobile compatibility test sent');
    }, 5500);

    setTimeout(() => {
      addResult('🎉 All analytics tests completed! Check browser console and GA4 debug.');
    }, 6000);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  // Check analytics status on mount and periodically
  useEffect(() => {
    checkAnalyticsStatus();
    const interval = setInterval(checkAnalyticsStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  // Check if GA is properly initialized
  useEffect(() => {
    const checkGA = () => {
      // Check if gtag exists
      if (typeof window !== 'undefined' && (window as any).gtag) {
        addResult('✅ Google Analytics gtag found');
      } else {
        addResult('❌ Google Analytics gtag not found');
      }

      // Check if GA4 is loaded
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        addResult('✅ DataLayer found');
      } else {
        addResult('❌ DataLayer not found');
      }
    };

    setTimeout(checkGA, 1000);
  }, []);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
        >
          🔍 Analytics Test
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-4 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-6 z-50 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Google Analytics Test Panel</h2>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">        <div className="flex gap-4 flex-wrap">
          <button
            onClick={runAnalyticsTests}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Run All Tests
          </button>
          <button
            onClick={checkAnalyticsStatus}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
          >
            Check Status
          </button>
          <button
            onClick={clearResults}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
          >
            Clear Results
          </button>
        </div>

        {/* Analytics Status Panel */}
        {analyticsStatus && (
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">📊 Analytics Status:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className={`p-2 rounded ${analyticsStatus.gaLoaded ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                <strong>GA Loaded:</strong> {analyticsStatus.gaLoaded ? '✅ Yes' : '❌ No'}
              </div>
              <div className={`p-2 rounded ${analyticsStatus.gtagAvailable ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                <strong>gtag Available:</strong> {analyticsStatus.gtagAvailable ? '✅ Yes' : '❌ No'}
              </div>
              <div className={`p-2 rounded ${analyticsStatus.dataLayerAvailable ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                <strong>DataLayer:</strong> {analyticsStatus.dataLayerAvailable ? '✅ Available' : '❌ Missing'}
              </div>
              <div className="p-2 rounded bg-blue-900/30 text-blue-300">
                <strong>Device:</strong> {analyticsStatus.deviceType}
              </div>
              <div className="p-2 rounded bg-gray-700 text-gray-300 col-span-1 md:col-span-2">
                <strong>Screen:</strong> {analyticsStatus.screenSize}
              </div>
              <div className="p-2 rounded bg-gray-700 text-gray-300 col-span-1 md:col-span-2">
                <strong>User Agent:</strong> {analyticsStatus.userAgent}
              </div>
              <div className="p-2 rounded bg-gray-700 text-gray-300 col-span-1 md:col-span-2">
                <strong>Network:</strong> {typeof analyticsStatus.networkInfo === 'object' ? JSON.stringify(analyticsStatus.networkInfo) : analyticsStatus.networkInfo}
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-4 max-h-96 overflow-auto">
          <h3 className="text-white font-semibold mb-2">Test Results:</h3>
          {testResults.length === 0 ? (
            <p className="text-gray-400">No tests run yet. Click "Run All Tests" to start.</p>
          ) : (
            <div className="space-y-1">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm text-gray-300 font-mono">
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>        <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4">
          <h4 className="text-yellow-400 font-semibold mb-2">📱 Mobile Testing Instructions:</h4>
          <ul className="text-yellow-300 text-sm space-y-1">
            <li>1. Open browser DevTools (F12)</li>
            <li>2. Toggle device emulation (mobile view)</li>
            <li>3. Go to Console tab</li>
            <li>4. Click "Check Status" to verify mobile detection</li>
            <li>5. Click "Run All Tests" to test analytics</li>
            <li>6. Look for Google Analytics events in console</li>
            <li>7. Check Network tab for gtag requests</li>
            <li>8. Verify GA4 debug mode messages</li>
            <li>9. Test on actual mobile device using network URL</li>
          </ul>
        </div>

        <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
          <h4 className="text-blue-400 font-semibold mb-2">🔗 Quick Links:</h4>
          <div className="space-y-2 text-sm">
            <a 
              href="/mobile-debug.html" 
              target="_blank" 
              className="text-blue-300 hover:text-blue-200 underline block"
            >
              📱 Mobile Debug Tool (Standalone)
            </a>
            <a 
              href="https://analytics.google.com/analytics/web/" 
              target="_blank" 
              className="text-blue-300 hover:text-blue-200 underline block"
            >
              📊 Google Analytics Dashboard
            </a>
            <p className="text-blue-300">
              <strong>GA4 ID:</strong> G-9H8RMSR2RZ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTestChecker;
