import { Search, User, Facebook, Twitter, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

const categories = [
  { name: 'Fashion' },
  { name: 'Electronics' },
  { name: 'Home' },
  { name: 'Handmade' },
];

const ItemCard = ({ item }) => (
  <Card className="overflow-hidden transform hover:scale-105 transition-transform duration-300 bg-gray-800 border-gray-700">
    <CardContent className="p-0">
      <img src={item.imageUrl} alt={item.title} className="aspect-square w-full object-cover" />
      <div className="p-4">
        <h3 className="font-semibold truncate text-white">{item.title}</h3>
        <p className="text-sm text-gray-400">{item.category}</p>
      </div>
    </CardContent>
  </Card>
);

export default function Home() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [trendingItems, setTrendingItems] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const listingsRef = collection(db, 'listings');

        const newArrivalsQuery = query(listingsRef, orderBy('createdAt', 'desc'), limit(4));
        const newArrivalsSnapshot = await getDocs(newArrivalsQuery);
        const newArrivalsData = newArrivalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNewArrivals(newArrivalsData);

        const trendingQuery = query(listingsRef, orderBy('createdAt', 'asc'), limit(4));
        const trendingSnapshot = await getDocs(trendingQuery);
        const trendingData = trendingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTrendingItems(trendingData);

      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Snap&Find" className="h-8 w-8" />
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>Snap&Find</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-orange-500">Hodus</a>
            <a href="#" className="hover:text-orange-500">Abanes</a>
            <a href="#" className="hover:text-orange-500">Stan Cuis</a>
            <User />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 lg:p-8">
        <section className="text-center my-12">
          <h2 className="text-5xl font-bold mb-4">Effortless Shopping, Powered by AI</h2>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
            <Input
              placeholder="Search for products, snap to find..."
              className="pl-12 pr-24 h-14 bg-gray-800 border-gray-700 rounded-full text-lg"
            />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 h-10 rounded-full bg-orange-500 hover:bg-orange-600 px-6">
              Srorw
            </Button>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex justify-center gap-8 mb-6 border-b border-gray-700">
            {categories.map((category) => (
              <button
                key={category.name}
                className="pb-2 border-b-2 border-transparent hover:border-orange-500 hover:text-orange-500 focus:outline-none focus:border-orange-500 focus:text-orange-500 transition-colors"
              >
                {category.name}
              </button>
            ))}
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Trending Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trendingItems.map(item => <ItemCard key={item.id} item={item} />)}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map(item => <ItemCard key={item.id} item={item} />)}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <a href="#" className="hover:text-orange-500">About Us</a>
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-orange-500">Help Center</a>
            <div className="flex gap-2">
              <Facebook className="h-6 w-6 hover:text-orange-500 cursor-pointer" />
              <Twitter className="h-6 w-6 hover:text-orange-500 cursor-pointer" />
              <Instagram className="h-6 w-6 hover:text-orange-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}