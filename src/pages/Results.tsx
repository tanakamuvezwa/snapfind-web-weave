import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SlidersHorizontal, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { products } from '@/lib/db';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


export default function Results() {
  const location = useLocation();
  const { aiAnalysis } = location.state || {};
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';
  const [showFilters, setShowFilters] = useState(isDesktop);

  // Filter products based on the AI analysis
  const similarProducts = aiAnalysis
    ? products.filter(p => 
        p.category === aiAnalysis.category && 
        p.name.toLowerCase().includes(aiAnalysis.name.toLowerCase().split(' ')[0]) &&
        p.name !== aiAnalysis.name
      )
    : products;

  const FiltersSidebar = () => (
    <div className={`${isDesktop ? '' : 'glass-card p-4 mb-4'} space-y-4`}>
      <div>
        <label className="text-sm font-medium mb-2 block">Price Range</label>
        <div className="flex gap-2">
          <Input placeholder="Min" type="number" className="bg-card/50" />
          <Input placeholder="Max" type="number" className="bg-card/50" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Distance</label>
        <Select>
          <SelectTrigger className="bg-card/50">
            <SelectValue placeholder="Any distance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Within 1km</SelectItem>
            <SelectItem value="5">Within 5km</SelectItem>
            <SelectItem value="10">Within 10km</SelectItem>
            <SelectItem value="25">Within 25km</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Condition</label>
        <Select>
          <SelectTrigger className="bg-card/50">
            <SelectValue placeholder="Any condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="like-new">Like New</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full bg-primary hover:bg-primary-glow">
        Apply Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <div className="px-4 pt-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Results for "{aiAnalysis?.name || 'Items'}"</h1>
              <p className="text-muted-foreground">Found {similarProducts.length} similar items</p>
            </div>
            {!isDesktop && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Sort */}
          <div className="flex gap-3">
            <Select defaultValue="distance">
              <SelectTrigger className="w-[180px] bg-card/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Nearest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-6">
          {/* Filters Sidebar (Desktop) */}
          {isDesktop && (
            <aside className="w-64 flex-shrink-0">
              <div className="glass-card p-4 sticky top-4">
                <h3 className="font-semibold mb-4">Filters</h3>
                <FiltersSidebar />
              </div>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters */}
            {!isDesktop && showFilters && <FiltersSidebar />}

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {similarProducts.map((item, index) => (
                <button
                  key={index}
                  className="glass-card-hover p-4 text-left"
                >
                  <div className="aspect-square rounded-xl bg-secondary/50 flex items-center justify-center mb-4 overflow-hidden">
                    <span className="text-6xl">{item.category === 'Electronics' ? '📱' : '👟'}</span>
                  </div>
                  
                  <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-3">${item.buyerPrice}</p>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{Math.floor(Math.random() * 10) + 1}km away</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{Math.floor(Math.random() * 24) + 1}h ago</span>
                    </div>
                    <p className="text-foreground">Seller: Random Seller</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
