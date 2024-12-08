// src/components/common/Logo/Logo.tsx
import React from 'react';
import { LogoLight, LogoDark, LogoIcon } from '../../../assets/images';

interface LogoProps {
  variant?: 'light' | 'dark' | 'icon';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '' }) => {
  const logoSrc = {
    light: LogoLight,
    dark: LogoDark,
    icon: LogoIcon,
  }[variant];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src={logoSrc} 
        alt="RESTART Project Logo" 
        className="h-11 w-auto object-contain"
      />
    </div>
  );
};
