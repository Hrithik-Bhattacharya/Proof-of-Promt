import React, { useState } from 'react';
import type { RegistrationProof } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { ShareIcon } from './icons/ShareIcon';
import { ShareModal } from './ShareModal';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

interface ProofDisplayProps {
  proof: RegistrationProof;
  content: string;
}

interface ProofRowProps {
  label: string;
  value: string;
  isHash?: boolean;
  url?: string;
}

const ProofRow: React.FC<ProofRowProps> = ({ label, value, isHash = false, url }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const valueContent = url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-sm"
    >
      <span className={`break-all ${isHash ? 'font-mono' : ''}`}>{value}</span>
      <ExternalLinkIcon className="w-4 h-4 shrink-0" />
    </a>
  ) : (
    <span className={`break-all ${isHash ? 'font-mono text-cyan-400' : ''}`}>{value}</span>
  );

  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm text-slate-200 sm:mt-0 sm:col-span-2 flex items-center gap-2">
        {valueContent}
        <button onClick={handleCopy} className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500">
          <ClipboardIcon className="w-4 h-4" />
          <span className="sr-only">Copy {label}</span>
        </button>
        {copied && <span className="text-xs text-green-400 animate-fade-in">Copied!</span>}
      </dd>
    </div>
  );
};

export const ProofDisplay: React.FC<ProofDisplayProps> = ({ proof, content }) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const etherscanBaseUrl = 'https://etherscan.io';

  return (
    <>
      <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl shadow-lg p-6 animate-fade-in">
        <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-4">
          3. Proof of Authorship Registered
        </h2>
        <div className="border-t border-slate-700">
          <dl className="divide-y divide-slate-700">
            <ProofRow label="Timestamp" value={new Date(proof.timestamp).toLocaleString()} />
            <ProofRow 
              label="Transaction ID" 
              value={proof.transactionId} 
              isHash 
              url={`${etherscanBaseUrl}/tx/${proof.transactionId}`} 
            />
            <ProofRow label="Content Hash (SHA-256)" value={proof.contentHash} isHash />
            <ProofRow 
              label="Block Number" 
              value={proof.blockNumber.toString()} 
              url={`${etherscanBaseUrl}/block/${proof.blockNumber}`}
            />
          </dl>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-700 flex justify-end">
            <button
                onClick={() => setShareModalOpen(true)}
                className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-cyan-200 bg-cyan-900/50 hover:bg-cyan-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all duration-200"
            >
                <ShareIcon className="w-5 h-5 mr-2" />
                Share Proof
            </button>
        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setShareModalOpen(false)}
        proof={proof}
        content={content}
      />
    </>
  );
};
