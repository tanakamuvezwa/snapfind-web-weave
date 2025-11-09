
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Welcome from "./pages/Welcome";
import MarketplacePage from "./pages/Marketplace"; // Import the new Marketplace page
import Camera from "./pages/Camera";
import Results from "./pages/Results";
import Listing from "./pages/Listing";
import Chat from "./pages/Chat";
import Wanted from "./pages/Wanted";
import Categories from "./pages/Categories";
import Auth from "./pages/Auth";
import CreateListing from "./pages/CreateListing";
import NotFound from "./pages/NotFound";
import "./i18n"; // Import the i18n configuration

const queryClient = new QueryClient();

function AppContent() {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';

  return (
    <div className="flex w-full min-h-screen">
      <Navigation />
      <main className={`flex-1 ${isDesktop ? 'ml-64' : ''}`}>
        <div className="absolute top-4 right-4 flex gap-4">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          {/* The /home route now shows the new Marketplace page */}
          <Route path="/home" element={<MarketplacePage />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/results" element={<Results />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/wanted" element={<Wanted />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppContent />
        </ThemeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
