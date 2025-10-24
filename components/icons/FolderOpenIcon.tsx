import React from 'react';

export const FolderOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M3.75 9.75h16.5m-16.5 0a2.25 2.25 0 01-2.25-2.25V5.25A2.25 2.25 0 013.75 3h5.25a2.25 2.25 0 011.591.659l2.157 2.157a2.25 2.25 0 001.591.659h5.25A2.25 2.25 0 0121 9v9a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18v-6.75z" 
    />
  </svg>
);
