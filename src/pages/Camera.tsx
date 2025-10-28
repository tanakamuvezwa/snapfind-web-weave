import { useState, useRef, useEffect } from 'react';
import { Camera as CameraIcon, Upload, X, Sparkles, Video, VideoOff, Camera } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { toast } from 'sonner';
import { products } from '@/lib/db';

type AIAnalysis = {
  name: string;
  category: string;
  confidence: number;
  suggestedPrice: string;
  condition: string;
  description: string;
};

export default function CameraPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const action = (location.state as { action?: 'buy' | 'sell' })?.action || 'buy';
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsWebcamActive(true);
        toast.success("Webcam started!");
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      toast.error("Could not access webcam. Please check permissions.");
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsWebcamActive(false);
    }
  };
  
  useEffect(() => {
    // Stop webcam when component unmounts
    return () => {
      stopWebcam();
    };
  }, []);

  const handleFileSelect = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      stopWebcam();
      const reader = new FileReader();
      reader.onload = async (e) => {
        setCapturedImage(e.target?.result as string);
        toast.success('Image uploaded successfully!');
        await analyzeImage(file.name);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const captureFromWebcam = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      stopWebcam();
      
      // We can't know the filename from a webcam shot, so we'll use a placeholder
      // In a real scenario, the image itself would be sent to an AI service.
      // For our simulation, let's pretend we detected an iPhone 15.
      await analyzeImage('iphone-15.jpg');
    }
  };

  const analyzeImage = async (fileName: string) => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    toast.loading('AI is analyzing your image...', { id: 'analyze' });

    await new Promise(resolve => setTimeout(resolve, 2000));

    const lowerCaseFileName = fileName.toLowerCase();
    const matchedProduct = products.find(p => p.keywords.some(k => lowerCaseFileName.includes(k)));

    if (matchedProduct) {
      const price = action === 'buy' ? matchedProduct.buyerPrice : matchedProduct.sellerPrice;
      const analysis: AIAnalysis = {
        name: matchedProduct.name,
        category: matchedProduct.category,
        confidence: 95 + Math.floor(Math.random() * 5), // 95-99%
        suggestedPrice: `$${price}`,
        condition: matchedProduct.condition,
        description: matchedProduct.description,
      };
      setAiAnalysis(analysis);
      toast.success('Image analyzed!', { id: 'analyze' });
    } else {
      toast.error('Could not identify the item in the image.', { id: 'analyze' });
    }
    setIsAnalyzing(false);
  };

  const handleNext = () => {
    if (action === 'buy') {
      navigate('/results', { state: { aiAnalysis } });
    } else {
      navigate('/listing', { state: { image: capturedImage, aiAnalysis } });
    }
  };
  
  const reset = () => {
      setCapturedImage(null);
      setAiAnalysis(null);
      stopWebcam();
  }

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
          <div
            className={`glass-card p-8 text-center transition-all duration-300 ${
              isDragging ? 'border-primary border-2 bg-primary/10' : ''
            }`}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileSelect(e.dataTransfer.files[0]); }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
          >
            <div className="aspect-video lg:aspect-[4/3] rounded-xl bg-secondary/50 flex items-center justify-center mb-6 overflow-hidden">
             {isWebcamActive ? (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"/>
             ) : (
              <div className="text-center">
                <CameraIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {isDesktop ? 'Drop an image or start your webcam' : 'Camera preview'}
                </p>
              </div>
             )}
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              {!isWebcamActive ? (
                 <Button size="lg" className="bg-primary hover:bg-primary-glow shadow-lg shadow-primary/30" onClick={startWebcam}>
                    <Video className="mr-2 h-5 w-5" />
                    {isDesktop ? 'Use Webcam' : 'Open Camera'}
                 </Button>
              ) : (
                <Button size="lg" className="bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30" onClick={captureFromWebcam}>
                    <Camera className="mr-2 h-5 w-5" />
                    Capture
                 </Button>
              )}
              
              <Button size="lg" variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-5 w-5" />
                Upload Image
              </Button>

              {isWebcamActive && (
                <Button size="lg" variant="destructive" onClick={stopWebcam}>
                    <VideoOff className="mr-2 h-5 w-5" />
                    Stop Cam
                 </Button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
            <canvas ref={canvasRef} className="hidden"></canvas>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold mb-3">Tips for best results:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• For uploads, use a filename with keywords like 'iphone-13-pro', 'samsung-s23', 'air force 1', etc.</li>
              <li>• Clear, well-lit photos work best</li>
              <li>• Center the item in the frame</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div className="glass-card p-4">
            <div className="relative aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden mb-4">
              <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
              <Button size="icon" variant="destructive" className="absolute top-4 right-4" onClick={reset}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {isAnalyzing && <p>Analyzing...</p>}

            {aiAnalysis && !isAnalyzing && (
              <div className="glass-card p-4 mb-4 bg-primary/10 space-y-3">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-semibold">{aiAnalysis.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-muted-foreground">Category</p><p className="font-semibold">{aiAnalysis.category}</p></div>
                  <div><p className="text-muted-foreground">Confidence</p><p className="font-semibold">{aiAnalysis.confidence}%</p></div>
                  <div><p className="text-muted-foreground">{action === 'buy' ? 'Est. Price' : 'Est. Value'}</p><p className="font-semibold text-primary">{aiAnalysis.suggestedPrice}</p></div>
                  <div><p className="text-muted-foreground">Condition</p><p className="font-semibold">{aiAnalysis.condition}</p></div>
                </div>
                <p className="text-sm text-muted-foreground">{aiAnalysis.description}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary-glow shadow-lg shadow-primary/30" onClick={handleNext} disabled={isAnalyzing || !aiAnalysis}>
                <Sparkles className="mr-2 h-5 w-5" />
                {action === 'buy' ? 'Find Similar Items' : 'Create Listing'}
              </Button>
              <Button size="lg" variant="outline" onClick={reset}>
                Retake
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
