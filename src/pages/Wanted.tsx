import React from 'react';
import { Link } from 'react-router-dom';
import { Aperture, Search, LayoutGrid, Tag, MessageSquare, User } from 'lucide-react';

const Wanted: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white flex-1 flex items-center justify-center p-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        {/* Left Side - Brand */}
        <div className="bg-[#0D0D0D] border border-gray-700/50 shadow-2xl rounded-3xl p-8 flex flex-col items-center justify-center text-center w-full max-w-xs">
          <div className="bg-orange-500/10 p-4 rounded-full">
              <div className="bg-orange-500/20 p-4 rounded-full">
                <Aperture className="h-20 w-20 text-orange-400" strokeWidth={1} />
              </div>
          </div>
          <h1 className="text-4xl font-bold mt-6">Snap&Find</h1>
          <p className="text-gray-400 mt-2">AI-Powered, Visual-First Classifieds</p>
        </div>

        {/* Right Side - Navigation */}
        <div className="flex flex-col">
          <h2 className="text-5xl font-bold mb-10 text-center lg:text-left">Welcome to Snap&Find</h2>
          <nav className="space-y-5">
            <Link to="/search" className="flex items-center gap-4 text-xl text-gray-300 hover:text-orange-400 transition-colors group">
              <Search className="h-7 w-7 text-orange-500/80 group-hover:text-orange-400" />
              <span>AI Search</span>
            </Link>
            <Link to="/categories" className="flex items-center gap-4 text-xl text-gray-300 hover:text-orange-400 transition-colors group">
              <LayoutGrid className="h-7 w-7 text-orange-500/80 group-hover:text-orange-400" />
              <span>Categories</span>
            </Link>
            <Link to="/listings" className="flex items-center gap-4 text-xl text-gray-300 hover:text-orange-400 transition-colors group">
              <Tag className="h-7 w-7 text-orange-500/80 group-hover:text-orange-400" />
              <span>Listings</span>
            </Link>
            <Link to="/chat" className="flex items-center gap-4 text-xl text-gray-300 hover:text-orange-400 transition-colors group">
              <MessageSquare className="h-7 w-7 text-orange-500/80 group-hover:text-orange-400" />
              <span>Chat</span>
            </Link>
            <Link to="/profile" className="flex items-center gap-4 text-xl text-gray-300 hover:text-orange-400 transition-colors group">
              <User className="h-7 w-7 text-orange-500/80 group-hover:text-orange-400" />
              <span>Profile</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Wanted;
