
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import { initGA, trackPageView } from "./lib/analytics";
import { initSecurityContext } from "./lib/https-security";
import { initSecurityProtections } from "./lib/security-utils";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {  // Initialize security, analytics and app context on startup
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 1. Initialize comprehensive security protections
        initSecurityProtections();
        
        // 2. Initialize HTTPS security context
        initSecurityContext();
        
        // 3. Initialize Google Analytics
        await initGA();
        
        // 4. Track initial page view
        if (window.gtag) {
          trackPageView(window.location.pathname, 'VAJRA Portfolio');
        }
      } catch (error) {
        // Log error but don't break the app
        console.error('Failed to initialize app:', error);
      }
    };
    
    initializeApp();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
