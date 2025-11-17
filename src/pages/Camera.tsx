import React, { useRef, useState } from 'react';
import { Camera as CameraIcon, Upload, Tag, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUseWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      setImageSrc(null); // Clear any previous image
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Snap to Buy ✨</h1>
        <p className="text-muted-foreground">
          Take a photo and AI will find matching items nearby
        </p>
      </div>

      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
        <CardContent className="p-8">
          <div className="h-96 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-center">
            {stream ? (
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            ) : imageSrc ? (
              <img src={imageSrc} alt="Uploaded" className="w-full h-full object-contain" />
            ) : (
              <>
                <CameraIcon className="w-16 h-16 text-gray-500 mb-4" />
                <p className="text-gray-400">Drop an image or start your webcam</p>
              </>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button>
                <ShoppingBag className="mr-2 h-4 w-4" /> Snap to Buy
            </Button>
            <Button variant="destructive">
                <Tag className="mr-2 h-4 w-4" /> Sell
            </Button>
            <Button onClick={handleUseWebcam}>
              <CameraIcon className="mr-2 h-4 w-4" /> Use Webcam
            </Button>
            <Button variant="secondary" onClick={handleUploadImage}>
              <Upload className="mr-2 h-4 w-4" /> Upload Image
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      <div className="w-full max-w-2xl mt-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Tips for best results:</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                For uploads, use a filename with keywords like 'iphone-13-pro',
                'samsung-s23', 'air force 1', etc.
              </li>
              <li>Clear, well-lit photos work best</li>
              <li>Center the item in the frame</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Camera;
