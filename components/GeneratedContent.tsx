
import React from 'react';
import { Spinner } from './Spinner';
import { FingerPrintIcon } from './icons/FingerPrintIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';


interface GeneratedContentProps {
  content: string;
  isGenerating: boolean;
  isRegistering: boolean;
  onRegister: () => void;
  hasProof: boolean;
}

export const GeneratedContent: React.FC<GeneratedContentProps> = ({ content, isGenerating, isRegistering, onRegister, hasProof }) => {
  if (isGenerating) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[200px]">
         <Spinner size="lg" />
         <p className="mt-4 text-slate-400">Gemini is creating your content...</p>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6 animate-fade-in">
      <h2 className="text-sm font-medium text-slate-300 mb-2">
        2. AI-Generated Content
      </h2>
      <div className="bg-slate-900/70 p-4 rounded-md border border-slate-700">
        <p className="text-slate-300 whitespace-pre-wrap">{content}</p>
      </div>
      <div className="mt-6 flex justify-end">
        {hasProof ? (
          <div className="inline-flex items-center px-6 py-2 text-base font-medium rounded-md text-green-300 bg-green-900/50 border border-green-700">
            <CheckCircleIcon className="w-5 h-5 mr-2" />
            Registered Successfully
          </div>
        ) : (
          <button
            onClick={onRegister}
            disabled={isRegistering}
            className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isRegistering ? (
              <>
                <Spinner className="mr-2" />
                Registering...
              </>
            ) : (
               <>
                <FingerPrintIcon className="w-5 h-5 mr-2" />
                Register on Blockchain
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
