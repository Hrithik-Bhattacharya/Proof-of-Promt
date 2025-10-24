import React from 'react';

export const ShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.195.025.39.042.583.05a2.25 2.25 0 012.134 2.134c.008.193.025.388.05.583m0 0a2.25 2.25 0 002.186 0m0 0c.025-.195.042-.39.05-.583a2.25 2.25 0 00-2.134-2.134c-.193-.008-.388-.025-.583-.05m0 0a2.25 2.25 0 000-2.186m0 2.186c-.195-.025-.39-.042-.583-.05a2.25 2.25 0 00-2.134-2.134c-.008-.193-.025-.388-.05-.583m0 0a2.25 2.25 0 01-2.186 0m0 0c-.025.195-.042.39-.05.583a2.25 2.25 0 012.134 2.134c.193.008.388.025.583.05" 
    />
  </svg>
);