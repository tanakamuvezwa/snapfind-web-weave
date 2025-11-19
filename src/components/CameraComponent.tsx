
import { useState, useRef, useEffect } from 'react';
import { Camera as CameraIcon, Upload, X, Video, VideoOff, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { toast } from 'sonner';

interface CameraComponentProps {
  onCapture: (image: Blob) => void;
  onClose: () => void;
}

export default function CameraComponent({ onCapture, onClose }: CameraComponentProps) {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';

  const [isWebcamActive, setIsWebcamActive] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startWebcam();
    return () => stopWebcam();
  }, []);

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
          onCapture(blob);
          stopWebcam();
        }
      }, 'image/jpeg');
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50">
      <div className="relative h-full w-full">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"/>
        <canvas ref={canvasRef} className="hidden"></canvas>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/50 flex justify-center gap-4">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30" onClick={captureFromWebcam}>
                <Camera className="mr-2 h-5 w-5" />
                Capture
            </Button>
            <Button size="lg" variant="destructive" onClick={onClose}>
                <X className="mr-2 h-5 w-5" />
                Close
            </Button>
        </div>
      </div>
    </div>
  );
}
