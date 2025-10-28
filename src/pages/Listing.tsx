import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Upload, X, DollarSign, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type AIAnalysis = {
  name: string;
  category: string;
  confidence: number;
  suggestedPrice: string;
  condition: string;
  description: string;
};

export default function Listing() {
  const location = useLocation();
  const { image, aiAnalysis } = (location.state as { image?: string; aiAnalysis?: AIAnalysis }) || {};

  const [images, setImages] = useState<string[]>(image ? [image] : []);
  const [title, setTitle] = useState(aiAnalysis?.name || '');
  const [description, setDescription] = useState(aiAnalysis?.description || '');
  const [price, setPrice] = useState(aiAnalysis?.suggestedPrice?.replace('$', '') || '');
  const [category, setCategory] = useState(aiAnalysis?.category.toLowerCase() || '');
  const [condition, setCondition] = useState(aiAnalysis?.condition.toLowerCase().replace(' ', '-') || '');

  useEffect(() => {
    if (aiAnalysis) {
      toast.success('AI pre-filled your listing!', { icon: '✨' });
    }
  }, [aiAnalysis]);

  const handleAddImage = () => {
    // In a real app, this would open a file picker
    if (images.length < 6) {
      setImages([...images, `https://images.unsplash.com/photo-${Date.now()}?w=400&h=400&fit=crop`]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Listing created successfully!');
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8 px-4 pt-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          List an Item
          {aiAnalysis && <Sparkles className="h-6 w-6 text-primary animate-pulse" />}
        </h1>
        <p className="text-muted-foreground">
          {aiAnalysis 
            ? 'AI has pre-filled your listing - review and publish!' 
            : 'Fill in the details to create your listing'}
        </p>
      </div>

      {aiAnalysis && (
        <div className="glass-card p-4 mb-6 bg-primary/10">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold mb-1">AI Analysis Applied</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div><p className="text-muted-foreground">Category</p><p className="font-medium">{aiAnalysis.category}</p></div>
                <div><p className="text-muted-foreground">Price</p><p className="font-medium text-primary">{aiAnalysis.suggestedPrice}</p></div>
                <div><p className="text-muted-foreground">Condition</p><p className="font-medium">{aiAnalysis.condition}</p></div>
                <div><p className="text-muted-foreground">Confidence</p><p className="font-medium">{aiAnalysis.confidence}%</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input placeholder="e.g., iPhone 13 Pro Max 256GB" className="bg-card/50" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea placeholder="Describe your item..." rows={6} className="bg-card/50 resize-none" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
          </div>

          <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Photos ({images.length}/6)</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {images.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                    <img src={img} alt={`Listing image ${index+1}`} className="w-full h-full object-cover" />
                    <Button type="button" size="icon" variant="destructive" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {images.length < 6 && (
                  <button type="button" onClick={handleAddImage} className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-primary transition-colors flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary">
                    <Upload className="h-6 w-6" />
                    <span className="text-xs">Add Photo</span>
                  </button>
                )}
              </div>
            </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
           <div className="glass-card p-6 space-y-4">
             <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-card/50"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="shoes">Shoes</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Condition</label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger className="bg-card/50"><SelectValue placeholder="Select condition" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>
           </div>

           <div className="glass-card p-6 space-y-4">
            <div>
                <label className="block text-sm font-medium mb-2">
                  Price {aiAnalysis && <span className="text-xs text-primary">(AI suggested)</span>}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input type="number" placeholder="Enter price" className="pl-10 bg-card/50" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
              </div>

             <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input placeholder="Enter your city" className="bg-card/50" required />
                <p className="text-xs text-muted-foreground mt-2">Your exact address won't be shown publicly.</p>
              </div>
           </div>
          
          <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary-glow shadow-lg shadow-primary/30">
            Publish Listing
          </Button>
        </div>
      </form>
    </div>
  );
}
