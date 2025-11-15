import { useNavigate } from 'react-router-dom';
import {
    Wrench,
    Flower,
    Lamp,
    Baby,
    ToyBrick,
    CarSeat,
    Shirt,
    Bike,
    Dumbbell,
    Tent,
    BookOpen,
    Music,
    Paintbrush,
    Sparkles,
    Dog,
    Gem,
    Ticket
} from 'lucide-react';

const allCategories = [
    { name: 'Tools & Equipment', icon: <Wrench size={32} /> },
    { name: 'Patio & Garden', icon: <Flower size={32} /> },
    { name: 'Indoor Decor', icon: <Lamp size={32} /> },
    { name: 'Toys & Games', icon: <ToyBrick size={32} /> },
    { name: 'Baby Gear', icon: <CarSeat size={32} /> },
    { name: "Kids' Clothing", icon: <Shirt size={32} /> },
    { name: 'Bikes & Cycling', icon: <Bike size={32} /> },
    { name: 'Fitness & Exercise', icon: <Dumbbell size={32} /> },
    { name: 'Camping & Hiking', icon: <Tent size={32} /> },
    { name: 'Books, Movies & Music', icon: <BookOpen size={32} /> },
    { name: 'Musical Instruments', icon: <Music size={32} /> },
    { name: 'Arts & Crafts', icon: <Paintbrush size={32} /> },
    { name: 'Pet Supplies', icon: <Dog size={32} /> },
    { name: 'Antiques & Collectibles', icon: <Gem size={32} /> },
    { name: 'Tickets', icon: <Ticket size={32} /> },
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
