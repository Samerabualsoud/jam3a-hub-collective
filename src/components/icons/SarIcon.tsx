
import React from 'react';

interface SarIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const SarIcon: React.FC<SarIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`sar-icon ${className}`}
    >
      <path d="M3 12h18" />
      <path d="M12 3v18" />
      <path d="M6 9a3 3 0 1 0 6 0 3 3 0 1 0 -6 0" />
      <path d="M12 15a3 3 0 1 0 6 0 3 3 0 1 0 -6 0" />
      <text 
        x="12" 
        y="21" 
        textAnchor="middle" 
        fontSize="6" 
        fill={color}
      >
        SAR
      </text>
    </svg>
  );
};
