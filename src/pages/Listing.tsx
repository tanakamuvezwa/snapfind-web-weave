import { useState } from 'react';
import { Upload, X, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Listing() {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';
  const [images, setImages] = useState<string[]>([]);

  const handleAddImage = () => {
    setImages([...images, `https://images.unsplash.com/photo-${Date.now()}?w=400&h=400&fit=crop`]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Listing created successfully!');
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8 px-4 pt-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">List an Item</h1>
        <p className="text-muted-foreground">Fill in the details to create your listing</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={`grid gap-6 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {/* Left Column / Top Section */}
          <div className="space-y-6">
            {/* Images */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Photos</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {images.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {images.length < 6 && (
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-primary transition-colors flex flex-col items-center justify-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Add Photo</span>
                  </button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Add up to 6 photos</p>
            </div>

            {/* Category & Condition */}
            <div className="glass-card p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select>
                  <SelectTrigger className="bg-card/50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="vehicles">Vehicles</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Condition</label>
                <Select>
                  <SelectTrigger className="bg-card/50">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Right Column / Bottom Section */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="glass-card p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  placeholder="iPhone 13 Pro Max 256GB"
                  className="bg-card/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  placeholder="Describe your item..."
                  rows={6}
                  className="bg-card/50 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="699"
                    className="pl-10 bg-card/50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="glass-card p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  placeholder="Enter your location"
                  className="bg-card/50"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Your exact address won't be shown publicly
                </p>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary-glow shadow-lg shadow-primary/30"
            >
              Publish Listing
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
