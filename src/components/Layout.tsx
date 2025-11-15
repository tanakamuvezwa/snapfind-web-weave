import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Camera, Search, PlusCircle, MessageSquare, Heart } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/home', icon: Home },
  { name: 'Capture', path: '/', icon: Camera },
  { name: 'Results', path: '/results', icon: Search },
  { name: 'List Item', path: '/list-item', icon: PlusCircle },
  { name: 'Chat', path: '/chat', icon: MessageSquare },
  { name: 'Wanted', path: '/wanted', icon: Heart },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#111111] text-white font-sans">
      <aside className="w-64 bg-[#1a1a1a] p-6 flex flex-col">
        <div className="mb-12">
          <h1 className="text-2xl font-bold">SnapFind</h1>
          <p className="text-sm text-gray-400">Visual Local Search</p>
        </div>
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-orange-600 text-white'
                    : 'hover:bg-gray-700'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
