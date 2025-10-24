
import React from 'react';
import { BlockchainIcon } from './icons/BlockchainIcon';

export const Header: React.FC = () => (
  <header className="text-center">
    <div className="flex justify-center items-center gap-4">
      <BlockchainIcon className="w-12 h-12 text-cyan-400" />
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Proof-of-Prompt
      </h1>
    </div>
    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
      Prove authorship of your AI-generated content. Generate, hash, and register your unique creations on a decentralized ledger.
    </p>
  </header>
);
