import React from 'react';
import { useTheme } from './ThemeProvider';

const ThemeToggle: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2 rounded-md bg-gray-800 text-white">
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
