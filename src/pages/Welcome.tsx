import { useNavigate } from 'react-router-dom';
import { Aperture, Search, LayoutGrid, MessageSquare, User } from 'lucide-react';
import '../styles/welcome.css'; // New CSS for the welcome page

// Mock phone image component for demonstration
const PhoneMockup = () => (
  <div className="relative h-[600px] w-[300px] bg-black border-4 border-gray-700 rounded-4xl overflow-hidden shadow-2xl rotate-in">
    <div className="absolute inset-0 bg-gray-900/50 flex flex-col justify-center items-center p-4">
      <div className="w-48 h-48 rounded-full border-8 border-orange-500/30 flex justify-center items-center mb-8 fiery-orange-pulse">
        <div className="w-36 h-36 rounded-full bg-orange-500/20 flex justify-center items-center">
          <Aperture className="w-24 h-24 text-orange-400" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-white">Snap&Find</h1>
      <p className="text-orange-400 text-sm">AI-Powered Visual-First Classifieds</p>
    </div>
  </div>
);

const MenuLink = ({ icon, label, to }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(to)} className="flex items-center gap-4 text-xl text-gray-300 hover:text-white hover:bg-white/5 p-3 rounded-lg transition-all duration-300 w-full text-left">
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 max-w-7xl mx-auto">
        {/* Left Side: Phone Mockup */}
        <div className="flex justify-center">
          <PhoneMockup />
        </div>

        {/* Right Side: Menu */}
        <div className="flex flex-col gap-6">
          <h2 className="text-5xl font-bold mb-6">Welcome to Snap&Find</h2>
          <MenuLink icon={<Search className="text-orange-400" />} label="AI Search" to="/camera" />
          <MenuLink icon={<LayoutGrid className="text-orange-400" />} label="Categories" to="/categories" />
          <MenuLink icon={<Aperture className="text-orange-400" />} label="Listings" to="/results" />
          <MenuLink icon={<MessageSquare className="text-orange-400" />} label="Chat" to="/chat" />
          <MenuLink icon={<User className="text-orange-400" />} label="Profile" to="/user-panel" />
        </div>
      </div>
    </div>
  );
}
