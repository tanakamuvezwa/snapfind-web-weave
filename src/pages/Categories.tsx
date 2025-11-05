import { useNavigate } from 'react-router-dom';
import { Annoyed, Wind, Watch, ToyBrick, Car, Home as HomeIcon, Shirt, ShoppingCart } from 'lucide-react';

const allCategories = [
    { name: 'Electronics', icon: <Watch size={32} /> },
    { name: 'Vehicles', icon: <Car size={32} /> },
    { name: 'Property', icon: <HomeIcon size={32} /> },
    { name: 'Apparel', icon: <Shirt size={32} /> },
    { name: 'Toys & Games', icon: <ToyBrick size={32} /> },
    { name: 'Collectibles', icon: <Annoyed size={32} /> },
    { name: 'Appliances', icon: <Wind size={32} /> },
    { name: 'Books & Magazines', icon: <ToyBrick size={32} /> },
    { name: 'Sporting Goods', icon: <ToyBrick size={32} /> },
    { name: 'Music & Instruments', icon: <ToyBrick size={32} /> },
    { name: 'Art & Crafts', icon: <ToyBrick size={32} /> },
    { name: 'Home & Garden', icon: <HomeIcon size={32} /> },
];

export default function Categories() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto p-4">
                    <h1 className="text-3xl font-bold text-gray-800">All Categories</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 lg:p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {allCategories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => navigate('/results')}
                            className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-transparent hover:border-orange-400 aspect-square"
                        >
                            <div className="text-orange-500 mb-4">{category.icon}</div>
                            <span className="text-md font-semibold text-center text-gray-700">{category.name}</span>
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
}
