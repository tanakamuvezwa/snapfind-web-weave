import { useNavigate } from 'react-router-dom';
import {
    Wrench,
    Flower,
    Lamp,
    Baby,
    ToyBrick,
    Shirt,
    Bike,
    Dumbbell,
    Tent,
    BookOpen,
    Music,
    Paintbrush,
    Dog,
    Gem,
    Ticket
} from 'lucide-react';

const allCategories = [
    { name: 'Tools & Equipment', icon: <Wrench size={32} /> },
    { name: 'Patio & Garden', icon: <Flower size={32} /> },
    { name: 'Indoor Decor', icon: <Lamp size={32} /> },
    { name: 'Toys & Games', icon: <ToyBrick size={32} /> },
    { name: 'Baby Gear', icon: <Baby size={32} /> },
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
        <div className="min-h-screen pb-20 lg:pb-8 px-4 pt-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">All Categories</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {allCategories.map((category) => (
                    <button
                        key={category.name}
                        onClick={() => navigate('/results', { state: { category: category.name } })}
                        className="glass-card-hover flex flex-col items-center justify-center p-6 aspect-square group"
                    >
                        <div className="text-primary mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                        <span className="text-sm font-semibold text-center">{category.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
