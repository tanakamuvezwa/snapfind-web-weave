import { Search, Camera, TrendingUp, User, LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import '../styles/home.css';

const categories = [
  { name: 'Electronics', icon: '📱' },
  { name: 'Furniture', icon: '🛋️' },
  { name: 'Vehicles', icon: '🚗' },
  { name: 'Clothing', icon: '👕' },
  { name: 'Books', icon: '📚' },
  { name: 'Sports', icon: '⚽' },
];

const floatingItems = [
  { id: 1, title: 'iPhone 13 Pro', price: '$699', image: '📱', style: { top: '10%', left: '5%', animation: 'float 6s ease-in-out infinite' } },
  { id: 2, title: 'Leather Sofa', price: '$350', image: '🛋️', style: { top: '30%', left: '80%', animation: 'float 7s ease-in-out infinite' } },
  { id: 3, title: 'Mountain Bike', price: '$450', image: '🚴', style: { top: '70%', left: '15%', animation: 'float 8s ease-in-out infinite' } },
  { id: 4, title: 'MacBook Air', price: '$899', image: '💻', style: { top: '50%', left: '50%', animation: 'float 5s ease-in-out infinite' } },
  { id: 5, title: 'Dining Table', price: '$200', image: '🪑', style: { top: '85%', left: '60%', animation: 'float 9s ease-in-out infinite' } },
  { id: 6, title: 'Nike Sneakers', price: '$120', image: '👟', style: { top: '5%', left: '90%', animation: 'float 6s ease-in-out infinite' } },
];

export default function Home() {
  const navigate = useNavigate();
  const user = null; // Placeholder for user state

  return (
    <div className="min-h-screen pb-20 lg:pb-8 animated-gradient text-white">
      {/* Header with User Actions */}
      <header className="absolute top-0 left-0 right-0 p-4 z-20">
        <div className="max-w-7xl mx-auto flex justify-end items-center">
          {user ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/user-panel')} className="text-white hover:bg-white/10">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" onClick={() => navigate('/sign-in')} className="text-white hover:bg-white/10">
              <LogIn className="h-5 w-5 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </header>

      <div className="relative grid grid-cols-1 lg:grid-cols-4 min-h-screen">
        {/* Left Panel: Categories */}
        <aside className="hidden lg:block col-span-1 p-8 bg-black/20 backdrop-blur-lg">
          <div className="sticky top-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><TrendingUp /> Categories</h2>
            <div className="space-y-4">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => navigate('/results')}
                  className="w-full text-left p-4 rounded-lg transition-colors hover:bg-white/10 flex items-center gap-4"
                >
                  <span className="text-3xl">{category.icon}</span>
                  <span className="font-semibold">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-1 lg:col-span-3 relative z-10 flex flex-col justify-center items-center p-4 text-center">
          <div className="absolute inset-0 overflow-hidden">
            {floatingItems.map(item => (
              <div
                key={item.id}
                className="absolute p-4 rounded-lg bg-white/10 backdrop-blur-md text-center shadow-lg"
                style={item.style}
              >
                <div className="text-5xl mb-2">{item.image}</div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-primary font-bold">{item.price}</p>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-4 text-shadow-lg">
              Snap to Find, Snap to Buy
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl text-shadow">
              The ultimate visual marketplace. See something you like? Just snap a picture to find and buy it from sellers near you.
            </p>

            <div className="w-full max-w-lg">
              <div className="relative flex-1 mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <Input
                  placeholder="Or type to search..."
                  className="pl-12 h-14 bg-white/10 backdrop-blur-xl border-white/20 rounded-full text-lg placeholder:text-white/50"
                  onKeyDown={(e) => e.key === 'Enter' && navigate('/results')}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  size="lg"
                  className="h-14 text-lg bg-primary hover:bg-primary-glow shadow-lg shadow-primary/30 rounded-full"
                  onClick={() => navigate('/camera', { state: { action: 'buy' } })}
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Snap to Buy
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-14 text-lg bg-white/10 hover:bg-white/20 rounded-full text-white"
                  onClick={() => navigate('/camera', { state: { action: 'sell' } })}
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Snap to Sell
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
