import { Search, Camera, TrendingUp, User, LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categories = [
  { name: 'Electronics', icon: '📱', color: 'from-blue-500 to-cyan-500' },
  { name: 'Furniture', icon: '🛋️', color: 'from-amber-500 to-orange-500' },
  { name: 'Vehicles', icon: '🚗', color: 'from-red-500 to-pink-500' },
  { name: 'Clothing', icon: '👕', color: 'from-purple-500 to-indigo-500' },
  { name: 'Books', icon: '📚', color: 'from-green-500 to-emerald-500' },
  { name: 'Sports', icon: '⚽', color: 'from-yellow-500 to-amber-500' },
];

const recentListings = [
  { id: 1, title: 'iPhone 13 Pro', price: '$699', image: '📱', location: '2km away', category: 'Electronics' },
  { id: 2, title: 'Leather Sofa', price: '$350', image: '🛋️', location: '5km away', category: 'Furniture' },
  { id: 3, title: 'Mountain Bike', price: '$450', image: '🚴', location: '1km away', category: 'Sports' },
  { id: 4, title: 'MacBook Air', price: '$899', image: '💻', location: '3km away', category: 'Electronics' },
  { id: 5, title: 'Dining Table', price: '$200', image: '🪑', location: '4km away', category: 'Furniture' },
  { id: 6, title: 'Nike Sneakers', price: '$120', image: '👟', location: '2km away', category: 'Clothing' },
];

export default function Home() {
  const navigate = useNavigate();
  const user = null; // Placeholder for user state

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      {/* Header with User Actions */}
      <header className="absolute top-0 left-0 right-0 p-4 z-10">
        <div className="max-w-7xl mx-auto flex justify-end items-center">
          {user ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/user-panel')}>
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" onClick={() => navigate('/sign-in')}>
              <LogIn className="h-5 w-5 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
        <div className="relative px-4 pt-24 pb-12 lg:pt-32 lg:pb-20 max-w-7xl mx-auto">
          <div className="text-center lg:text-left lg:max-w-2xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
              Snap to Find,{' '}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Snap to Buy
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Visual search for local classifieds. Take a photo, find it nearby.
            </p>

            {/* Search and Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for items..."
                  className="pl-10 h-12 bg-card/50 backdrop-blur-xl border-white/10"
                  onKeyDown={(e) => e.key === 'Enter' && navigate('/results')}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-glow shadow-lg shadow-primary/30"
                  onClick={() => navigate('/camera', { state: { action: 'buy' } })}
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Snap to Buy
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate('/camera', { state: { action: 'sell' } })}
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Snap to Sell
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Browse Categories</h2>
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => navigate('/results')}
              className="glass-card-hover p-6 text-center group"
            >
              <div className={`text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300`}>
                {category.icon}
              </div>
              <h3 className="font-semibold text-sm">{category.name}</h3>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Listings */}
      <div className="px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Recent Listings Near You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentListings.map((listing) => (
            <button
              key={listing.id}
              onClick={() => navigate('/results')}
              className="glass-card-hover p-4 text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {listing.image}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 truncate">{listing.title}</h3>
                  <p className="text-primary font-bold text-lg mb-1">{listing.price}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{listing.location}</span>
                    <span>•</span>
                    <span>{listing.category}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
