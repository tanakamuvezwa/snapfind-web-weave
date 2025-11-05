import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";

export default function CreateListing() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Please sign in", description: "You must be logged in to create a listing.", variant: "destructive" });
      return;
    }
    if (!title || !price || !image) {
      toast({ title: "Missing fields", description: "Please fill out all required fields.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);

    try {
      // 1. Upload image to Firebase Storage
      const imageRef = ref(storage, `listings/${user.uid}/${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // 2. Add listing to Firestore
      await addDoc(collection(db, 'listings'), {
        title,
        price: parseFloat(price),
        description,
        imageUrl,
        userId: user.uid,
        createdAt: new Date(),
      });

      toast({ title: "Listing Created!", description: "Your item is now live." });
      navigate('/home');
    } catch (error) {
      console.error("Error creating listing:", error);
      toast({ title: "Error", description: "There was a problem creating your listing.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create a New Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Listing Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="h-12"
            />
            <Input
              type="number"
              placeholder="Price ($)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="h-12"
            />
            <Textarea
              placeholder="Describe your item..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Item Image</label>
              <Input
                id="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </div>
            <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Create Listing'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
