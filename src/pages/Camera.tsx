import { useState, useRef } from 'react';
import { Camera as CameraIcon, Upload, X, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { toast } from 'sonner';

export default function Camera() {
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        toast.success('Image uploaded successfully!');
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

  const simulateCapture = () => {
    // Mock image capture
    setCapturedImage('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop');
    toast.success('Photo captured!');
  };

  const handleAnalyze = () => {
    toast.success('Analyzing image...');
    setTimeout(() => navigate('/results'), 1000);
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8 px-4 pt-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Visual Search</h1>
        <p className="text-muted-foreground">
          {isDesktop ? 'Upload an image or use your webcam' : 'Take a photo of what you\'re looking for'}
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

            <div className="glass-card p-4 mb-4 bg-primary/10">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-semibold">Detection: Electronics</p>
                  <p className="text-sm text-muted-foreground">Confidence: 95%</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary-glow shadow-lg shadow-primary/30"
                onClick={handleAnalyze}
              >
                Find Similar Items
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setCapturedImage(null)}
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
