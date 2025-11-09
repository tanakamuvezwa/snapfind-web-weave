
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ShoppingCart, Tag } from "lucide-react";
import Logo from "@/components/Logo";

const Welcome = () => {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleLogoClick = () => {
    setIsSpinning(true);
    // Wait for the spin animation to be visually noticeable before navigating
    setTimeout(() => {
      navigate('/home');
    }, 300); // 300ms delay
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 md:p-8">

      {/* Main Card */}
      <Card className="w-full max-w-4xl bg-background border-none shadow-none">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Side: Interactive Logo */}
          <div 
            className="flex flex-col items-center justify-center p-8 bg-card rounded-xl cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={handleLogoClick}
          >
            <div className={`transition-transform duration-500 ${isSpinning ? 'rotate-360' : ''}`}>
              <Logo className="w-48 h-48" />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-center">Snap&Find</h2>
            <p className="text-muted-foreground text-center">AI-Powered Visual-First Classifieds</p>
          </div>

          {/* Right Side: Options */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left">Welcome to Snap&Find</h1>
            
            <Button size="lg" className="w-full justify-start text-lg py-6" onClick={() => navigate('/camera?action=buy')}>
              <Sparkles className="mr-4 h-6 w-6" /> AI Search
            </Button>

            <Button size="lg" className="w-full justify-start text-lg py-6" onClick={() => navigate('/home')}>
                <ShoppingCart className="mr-4 h-6 w-6" /> Browse Marketplace
            </Button>
            
            <Button size="lg" className="w-full justify-start text-lg py-6" onClick={() => navigate('/camera?action=sell')}>
              <Tag className="mr-4 h-6 w-6" /> List an Item
            </Button>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;
