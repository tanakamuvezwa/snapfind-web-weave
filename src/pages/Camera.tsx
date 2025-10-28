import { useState, useRef } from 'react';
import { Camera as CameraIcon, Upload, X, CheckCircle, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { toast } from 'sonner';

type AIAnalysis = {
  category: string;
  confidence: number;
  suggestedPrice: string;
  condition: string;
  description: string;
};

export default function Camera() {
  const navigate = useNavigate();
  const location = useLocation();
  const action = (location.state as { action?: 'buy' | 'sell' })?.action || 'buy';
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setCapturedImage(e.target?.result as string);
        toast.success('Image uploaded successfully!');
        await analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    toast.loading('AI is analyzing your image...', { id: 'analyze' });
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysis: AIAnalysis = {
      category: 'Electronics',
      confidence: 95,
      suggestedPrice: '$699',
      condition: 'Like New',
      description: 'High-quality headphones with premium sound and noise cancellation features.',
    };
    
    setAiAnalysis(analysis);
    setIsAnalyzing(false);
    toast.success('Image analyzed!', { id: 'analyze' });
  };

  const simulateCapture = async () => {
    setCapturedImage('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop');
    toast.success('Photo captured!');
    await analyzeImage();
  };

  const handleNext = () => {
    if (action === 'buy') {
      navigate('/results', { state: { aiAnalysis } });
    } else {
      navigate('/listing', { state: { image: capturedImage, aiAnalysis } });
    }
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8 px-4 pt-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          {action === 'buy' ? 'Snap to Buy' : 'Snap to Sell'}
          <Sparkles className="h-6 w-6 text-primary" />
        </h1>
        <p className="text-muted-foreground">
          {action === 'buy' 
            ? 'Take a photo and AI will find matching items nearby'
            : 'Take a photo and AI will create your listing automatically'}
        </p>
      </div>

      {!capturedImage ? (
        <div className="space-y-4">
          {/* Camera/Upload Area */}
          <div
            className={`glass-card p-8 text-center transition-all duration-300 ${
              isDragging ? 'border-primary border-2 bg-primary/10' : ''
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="aspect-video lg:aspect-[4/3] rounded-xl bg-secondary/50 flex items-center justify-center mb-6 overflow-hidden">
              <div className="text-center">
                <CameraIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {isDesktop ? 'Drop an image here' : 'Camera preview'}
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-glow shadow-lg shadow-primary/30"
                onClick={simulateCapture}
              >
                <CameraIcon className="mr-2 h-5 w-5" />
                {isDesktop ? 'Use Webcam' : 'Take Photo'}
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Image
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
          </div>

          {/* Tips */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-3">Tips for best results:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Clear, well-lit photos work best</li>
              <li>• Center the item in the frame</li>
              <li>• Avoid reflections and shadows</li>
              <li>• Multiple angles can help identify items</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          {/* Preview */}
          <div className="glass-card p-4">
            <div className="relative aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden mb-4">
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-full object-cover"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-4 right-4"
                onClick={() => setCapturedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {aiAnalysis && !isAnalyzing && (
              <div className="glass-card p-4 mb-4 bg-primary/10 space-y-3">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-semibold">AI Analysis Complete</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p className="font-semibold">{aiAnalysis.category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Confidence</p>
                    <p className="font-semibold">{aiAnalysis.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Suggested Price</p>
                    <p className="font-semibold text-primary">{aiAnalysis.suggestedPrice}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Condition</p>
                    <p className="font-semibold">{aiAnalysis.condition}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{aiAnalysis.description}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary-glow shadow-lg shadow-primary/30"
                onClick={handleNext}
                disabled={isAnalyzing || !aiAnalysis}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {action === 'buy' ? 'Find Similar Items' : 'Create Listing'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  setCapturedImage(null);
                  setAiAnalysis(null);
                }}
              >
                Retake
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
