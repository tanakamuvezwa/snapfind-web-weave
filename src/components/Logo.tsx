
import React from 'react';

const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <img src="/logo.png" alt="Snap&Find" className={className} />
  );
};

export default Logo;
