
import React from 'react';

export const FingerPrintIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.588 8.263M4.5 19.5A2.25 2.25 0 016.75 17.25a2.25 2.25 0 012.25 2.25c0 1.242-1.008 2.25-2.25 2.25S4.5 20.742 4.5 19.5z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 12.75h.008v.008H12v-.008z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M16.5 15.75h.008v.008h-.008v-.008z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 15.75h.008v.008H12v-.008zM12 9.75h.008v.008H12v-.008zM14.25 12.75h.008v.008h-.008v-.008zM14.25 9.75h.008v.008h-.008v-.008zM9.75 12.75h.008v.008H9.75v-.008zM9.75 15.75h.008v.008H9.75v-.008z" 
    />
  </svg>
);
