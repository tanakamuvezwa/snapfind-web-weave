import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Camera from "./pages/Camera";
import Results from "./pages/Results";
import Listing from "./pages/Listing";
import Chat from "./pages/Chat";
import Wanted from "./pages/Wanted";
import Categories from "./pages/Categories";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';

  return (
    <div className="flex w-full min-h-screen">
      <Navigation />
      <main className={`flex-1 ${isDesktop ? 'ml-64' : ''}`}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/results" element={<Results />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/wanted" element={<Wanted />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/auth" element={<Auth />} />
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
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
