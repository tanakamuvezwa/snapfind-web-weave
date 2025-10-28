import { Camera, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Welcome() {
  const navigate = useNavigate();

  const handleAction = (action: 'buy' | 'sell') => {
    navigate('/camera', { state: { action } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        {/* Logo */}
        <div className="mb-8 relative">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-glow shadow-lg shadow-primary/50 mb-4">
            <Camera className="h-16 w-16 text-white" strokeWidth={2.5} />
          </div>
          <Sparkles className="absolute top-0 right-1/3 h-8 w-8 text-primary animate-pulse" />
        </div>

        {/* Branding */}
        <h1 className="text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-white via-primary-glow to-primary bg-clip-text text-transparent">
          SnapFind
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          AI-Powered Visual Marketplace
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full h-16 text-lg bg-primary hover:bg-primary-glow shadow-lg shadow-primary/30 group"
            onClick={() => handleAction('buy')}
          >
            <Camera className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
            Snap to Buy
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full h-16 text-lg border-primary/30 hover:bg-primary/10 hover:border-primary group"
            onClick={() => handleAction('sell')}
          >
            <Camera className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
            Snap to Sell
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Take a photo and let AI do the rest
        </p>
      </div>
    </div>
  );
}
