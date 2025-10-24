
import React from 'react';
import type { RegistrationProof } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface ProofDisplayProps {
  proof: RegistrationProof;
}

const ProofRow: React.FC<{ label: string; value: string; isHash?: boolean }> = ({ label, value, isHash = false }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm text-slate-200 sm:mt-0 sm:col-span-2 flex items-center gap-2">
        <span className={`break-all ${isHash ? 'font-mono text-cyan-400' : ''}`}>
          {value}
        </span>
        <button onClick={handleCopy} className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500">
          <ClipboardIcon className="w-4 h-4" />
          <span className="sr-only">Copy</span>
        </button>
        {copied && <span className="text-xs text-green-400">Copied!</span>}
      </dd>
    </div>
  );
};

export const ProofDisplay: React.FC<ProofDisplayProps> = ({ proof }) => (
  <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl shadow-lg p-6 animate-fade-in">
    <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-4">
      3. Proof of Authorship Registered
    </h2>
    <div className="border-t border-slate-700">
      <dl className="divide-y divide-slate-700">
        <ProofRow label="Timestamp" value={new Date(proof.timestamp).toLocaleString()} />
        <ProofRow label="Transaction ID" value={proof.transactionId} isHash />
        <ProofRow label="Content Hash (SHA-256)" value={proof.contentHash} isHash />
        <ProofRow label="Block Number" value={proof.blockNumber.toString()} />
      </dl>
    </div>
  </div>
);
