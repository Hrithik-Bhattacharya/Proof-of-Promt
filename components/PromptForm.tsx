
import React from 'react';
import { Spinner } from './Spinner';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, onGenerate, isGenerating }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6">
      <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
        1. Enter Your Creative Prompt
      </label>
      <textarea
        id="prompt"
        rows={4}
        className="block w-full bg-slate-900 border border-slate-600 rounded-md shadow-sm text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
        placeholder="e.g., A cyberpunk cityscape at sunset, with flying cars and neon signs..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isGenerating}
      />
      <div className="mt-4 flex justify-end">
        <button
          onClick={onGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isGenerating ? (
            <>
              <Spinner className="mr-2" />
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2" />
              Generate Content
            </>
          )}
        </button>
      </div>
    </div>
  );
};
