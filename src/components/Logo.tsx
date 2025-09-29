
import React from 'react';
import vallumLogo from '@/assets/vallum-logo.png';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <img 
        src={vallumLogo} 
        alt="Vallum Logo" 
        className="h-8 w-8 object-contain"
      />
      <span className="text-xl font-bold text-foreground font-poppins">Vallum</span>
    </div>
  );
};

export default Logo;
