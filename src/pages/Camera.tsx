import { useState, useRef, useEffect } from 'react';
import { Camera as CameraIcon, Upload, X, Sparkles, Video, VideoOff, Camera } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { toast } from 'sonner';

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
  const [imageFile, setImageFile] = useState<Blob | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (imageFile) {
      analyzeImage(imageFile);
    }
  }, [imageFile]);

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
    return () => stopWebcam();
  }, []);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      stopWebcam();
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        setImageFile(file);
        toast.success('Image uploaded successfully!');
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
      
      canvas.toBlob((blob) => {
        if (blob) {
          setCapturedImage(URL.createObjectURL(blob));
          setImageFile(blob);
        }
      }, 'image/jpeg');
      stopWebcam();
    }
  };

  const analyzeImage = async (imageBlob: Blob) => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    toast.loading('AI is analyzing your image...', { id: 'analyze' });

    const formData = new FormData();
    formData.append('file', imageBlob, 'image.jpg');

    try {
      const response = await fetch('/api/identify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const analysis: AIAnalysis = {
        name: data.product.name,
        description: data.description,
        suggestedPrice: `$${data.price}`.replace(/\n/g, ''),
        // The following are placeholders as the backend doesn't provide them
        category: 'Identified Item',
        confidence: 98,
        condition: 'Used',
      };

      setAiAnalysis(analysis);
      toast.success('Image analyzed!', { id: 'analyze' });

    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to analyze image.', { id: 'analyze' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNext = () => {
    if (action === 'buy') {
      navigate('/buy', { state: { product: aiAnalysis, description: aiAnalysis?.description } });
    } else {
      navigate('/sell', { state: { image: capturedImage, product: aiAnalysis, description: aiAnalysis?.description, price: aiAnalysis?.suggestedPrice } });
    }
  };
  
  const reset = () => {
      setCapturedImage(null);
      setAiAnalysis(null);
      setImageFile(null);
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
              <li>• Use a clear, well-lit photo of the item.</li>
              <li>• Ensure the item is the main focus of the image.</li>
              <li>• Generic items may be harder to identify.</li>
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

            {isAnalyzing && (
                <div className="text-center p-4">
                    <p>Analyzing...</p>
                </div>
            )}

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
