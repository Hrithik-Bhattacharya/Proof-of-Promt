
import React from 'react';

export const BlockchainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="8" y="8" width="8" height="8" rx="2" ry="2"></rect>
    <path d="M8 12h-4" />
    <path d="M16 12h4" />
    <path d="M12 8V4" />
    <path d="M12 16v4" />
    <path d="m18.5 5.5.8-.8" />
    <path d="m4.7 4.7.8.8" />
    <path d="m18.5 18.5.8.8" />
    <path d="m4.7 19.3.8-.8" />
  </svg>
);
