import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Aperture } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Results: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleSnapClick = () => {
    navigate('/camera', { state: { action: 'buy' } });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-6">Search Listings</h1>
          
          {/* Search Bar with Snap Button */}
          <div className="flex gap-3 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 h-12 text-lg bg-card border-border"
              />
            </div>
            <Button 
              onClick={handleSearch}
              size="lg"
              className="h-12 px-8"
            >
              Search
            </Button>
            <Button
              onClick={handleSnapClick}
              variant="outline"
              size="lg"
              className="h-12 px-6 gap-2 border-primary/30 hover:bg-primary/10"
            >
              <Aperture className="h-5 w-5 text-primary" />
              <span>Snap</span>
            </Button>
          </div>
        </div>

        {/* Results Grid - Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Card key={item} className="glass-card-hover cursor-pointer">
              <CardContent className="p-0">
                <div className="aspect-square bg-muted/30 rounded-t-xl flex items-center justify-center">
                  <span className="text-muted-foreground">Product {item}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">Item Title</h3>
                  <p className="text-sm text-muted-foreground mb-2">$99.99</p>
                  <p className="text-xs text-muted-foreground">Location, State</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
