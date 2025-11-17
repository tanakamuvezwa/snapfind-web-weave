import React from 'react';
import { Flame, DollarSign, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WantedItem {
  id: string;
  title: string;
  description: string;
  maxPrice: number;
  location: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  posted: string;
}

const mockWantedItems: WantedItem[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro',
    description: 'Looking for a used iPhone 13 Pro in good condition. Prefer unlocked.',
    maxPrice: 650,
    location: 'San Francisco, CA',
    category: 'Electronics',
    urgency: 'high',
    posted: '2 hours ago'
  },
  {
    id: '2',
    title: 'Mountain Bike',
    description: 'Need a mountain bike for weekend trails. Size medium preferred.',
    maxPrice: 400,
    location: 'Denver, CO',
    category: 'Sports',
    urgency: 'medium',
    posted: '5 hours ago'
  },
  {
    id: '3',
    title: 'Gaming Chair',
    description: 'Looking for an ergonomic gaming chair with lumbar support.',
    maxPrice: 250,
    location: 'Austin, TX',
    category: 'Furniture',
    urgency: 'low',
    posted: '1 day ago'
  },
  {
    id: '4',
    title: 'Canon DSLR Camera',
    description: 'Want to buy Canon EOS or similar DSLR with lens kit.',
    maxPrice: 800,
    location: 'New York, NY',
    category: 'Electronics',
    urgency: 'high',
    posted: '3 hours ago'
  },
  {
    id: '5',
    title: 'Vintage Leather Jacket',
    description: 'Searching for authentic vintage leather jacket, size L.',
    maxPrice: 150,
    location: 'Los Angeles, CA',
    category: 'Fashion',
    urgency: 'medium',
    posted: '6 hours ago'
  },
  {
    id: '6',
    title: 'Standing Desk',
    description: 'Need electric standing desk, adjustable height.',
    maxPrice: 350,
    location: 'Seattle, WA',
    category: 'Furniture',
    urgency: 'low',
    posted: '2 days ago'
  }
];

const Wanted: React.FC = () => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-orange-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Wanted Items</h1>
          </div>
          <p className="text-muted-foreground">People are looking for these items. Have what they need? Make an offer!</p>
        </div>

        {/* Wanted Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWantedItems.map((item) => (
            <Card key={item.id} className="glass-card-hover cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {item.category}
                  </Badge>
                  <Flame className={`h-5 w-5 ${getUrgencyColor(item.urgency)}`} />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="font-semibold">Max Budget: ${item.maxPrice}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">{item.posted}</span>
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
