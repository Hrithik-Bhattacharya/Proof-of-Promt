import React, { useState, useCallback, useEffect } from 'react';
import type { RegistrationProof } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XIcon } from './icons/XIcon';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  proof: RegistrationProof;
  content: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, proof, content }) => {
  const [copied, setCopied] = useState(false);

  const generateShareText = useCallback(() => {
    const contentSnippet = content.length > 100 ? `${content.substring(0, 100).trim()}...` : content;
    return `Check out my AI-generated creation, secured on the blockchain!

✨ Proof-of-Prompt ✨

📝 Prompt: "${proof.prompt}"

📜 Content Snippet:
"${contentSnippet}"

🔒 Content Hash (SHA-256): ${proof.contentHash}
🔗 Transaction ID: ${proof.transactionId}

Generated with #ProofOfPrompt #AI #Blockchain #DigitalOwnership`;
  }, [proof, content]);
  
  const [shareText, setShareText] = useState(generateShareText());
  
  useEffect(() => {
    setShareText(generateShareText());
  }, [generateShareText])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [shareText]);
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-slate-800 border border-cyan-500/30 rounded-xl shadow-2xl w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Close"
        >
          <XIcon className="w-6 h-6" />
        </button>

        <div className="p-6 md:p-8">
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-4">
            Share Your Proof of Authorship
          </h2>

          <p className="text-slate-400 mb-4 text-sm">
            Copy the text below to share on social media, email, or any other platform.
          </p>
          
          <div className="bg-slate-900/70 p-4 rounded-md border border-slate-700 max-h-60 overflow-y-auto">
            <pre className="text-slate-300 whitespace-pre-wrap text-xs font-mono">{shareText}</pre>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleCopy}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200"
            >
              {copied ? (
                <>
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <ClipboardIcon className="w-5 h-5 mr-2" />
                  Copy Summary
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};