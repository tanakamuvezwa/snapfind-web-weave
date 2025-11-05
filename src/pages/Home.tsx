import { Search, Annoyed, Wind, Watch, ToyBrick, Car, Home as HomeIcon, Shirt, ShoppingCart, LogIn, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const categories = [
  { name: 'Electronics', icon: <Watch /> },
  { name: 'Vehicles', icon: <Car /> },
  { name: 'Property', icon: <HomeIcon /> },
  { name: 'Apparel', icon: <Shirt /> },
  { name: 'Toys & Games', icon: <ToyBrick /> },
  { name: 'Collectibles', icon: <Annoyed /> },
  { name: 'Appliances', icon: <Wind /> },
  { name: 'All Categories', icon: <ShoppingCart /> },
];

const featuredItems = [
  { id: 1, title: 'Vintage Leather Jacket', price: '$150', image: '🧥' },
  { id: 2, title: 'Antique Pocket Watch', price: '$500', image: '⌚' },
  { id: 3, title: 'Rare Comic Book', price: '$275', image: '📖' },
  { id: 4, title: 'Custom Mechanical Keyboard', price: '$220', image: '⌨️' },
];

const newArrivals = [
  { id: 1, title: 'Modern Art Print', price: '$80', image: '🖼️' },
  { id: 2, title: 'Handmade Ceramic Mug', price: '$35', image: '☕' },
  { id: 3, title: 'Smart Home Hub', price: '$120', image: '🤖' },
  { id: 4, title: 'Designer Sunglasses', price: '$190', image: '😎' },
];

const ItemCard = ({ item }) => (
  <Card className="overflow-hidden transform hover:scale-105 transition-transform duration-300">
    <CardContent className="p-0">
      <div className="aspect-square bg-gray-100 flex items-center justify-center text-5xl">{item.image}</div>
      <div className="p-4">
        <h3 className="font-semibold truncate">{item.title}</h3>
        <p className="text-primary font-bold">{item.price}</p>
      </div>
    </CardContent>
  </Card>
);

export default function Home() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleSignOut = async () => {
    await auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto p-4 flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate('/')}>Snap&Find</h1>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search the marketplace..."
              className="pl-10 h-12 bg-gray-100 border-transparent focus:border-orange-500 focus:bg-white"
              onKeyDown={(e) => e.key === 'Enter' && navigate('/results')}
            />
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Button variant="ghost" size="icon">
                  <User />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <LogOut />
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/auth')}>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 lg:p-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => navigate('/categories')}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-transparent hover:border-orange-400 aspect-square"
              >
                <div className="text-orange-500 mb-2">{category.icon}</div>
                <span className="text-sm font-semibold text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Items</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredItems.map(item => <ItemCard key={item.id} item={item} />)}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">New Arrivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map(item => <ItemCard key={item.id} item={item} />)}
          </div>
        </section>
      </main>
    </div>
  );
}
