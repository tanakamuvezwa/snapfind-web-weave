import React, { useState, useEffect } from 'react';
import { Flame, DollarSign, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { db } from '../firebase'; // Make sure to import your Firestore instance
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import CameraComponent from '@/components/CameraComponent'; // Import the new CameraComponent

interface RequestItem {
  id: string;
  title: string;
  description: string;
  price: number;
  createdAt: any; // Using any to avoid type issues with Firestore Timestamps
}

const Wanted: React.FC = () => {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCameraOpen, setIsCameraOpen] = useState(false); // State to control camera visibility
  const [capturedImage, setCapturedImage] = useState<Blob | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsCollection = collection(db, 'requests');
        const q = query(requestsCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const requestsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as RequestItem[];
        setRequests(requestsData);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleCapture = (image: Blob) => {
    setCapturedImage(image);
    setIsCameraOpen(false);
    // You can now do something with the captured image, like upload it or display it.
    console.log('Image captured:', image);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {isCameraOpen && (
          <CameraComponent 
            onCapture={handleCapture} 
            onClose={() => setIsCameraOpen(false)} 
          />
        )}

        <div className="mb-8 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Flame className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Requested Items</h1>
            </div>
            <p className="text-muted-foreground">People are looking for these items. Have what they need? Make an offer!</p>
          </div>
          <Button variant="outline" size="icon" onClick={() => setIsCameraOpen(true)}>
            <Camera className="h-6 w-6" />
          </Button>
        </div>

        {/* Display captured image for demonstration */}
        {capturedImage && (
            <div className='mb-4'>
                <img src={URL.createObjectURL(capturedImage)} alt="Captured" className="rounded-lg" />
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((item) => (
            <Card key={item.id} className="glass-card-hover cursor-pointer">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="font-semibold">Budget: ${item.price}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                   <span className="text-xs text-muted-foreground">
                    {new Date(item.createdAt?.seconds * 1000).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wanted;
