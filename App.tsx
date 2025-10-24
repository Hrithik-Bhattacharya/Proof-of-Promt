import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { GeneratedContent } from './components/GeneratedContent';
import { ProofDisplay } from './components/ProofDisplay';
import { generateContentFromPrompt } from './services/geminiService';
import { calculateSHA256 } from './utils/crypto';
import type { RegistrationProof } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [registrationProof, setRegistrationProof] = useState<RegistrationProof | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draftMessage, setDraftMessage] = useState<string | null>(null);

  const showDraftMessage = (message: string) => {
    setDraftMessage(message);
    setTimeout(() => setDraftMessage(null), 3000);
  };

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    setIsGenerating(true);
    setError(null);
    setGeneratedContent('');
    setRegistrationProof(null);

    try {
      const content = await generateContentFromPrompt(prompt);
      setGeneratedContent(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsGenerating(false);
    }
  }, [prompt]);

  const handleRegister = useCallback(async () => {
    setIsRegistering(true);
    setError(null);

    try {
      const dataToHash = `PROMPT: ${prompt}\n\nCONTENT: ${generatedContent}`;
      const hash = await calculateSHA256(dataToHash);
      
      // Simulate blockchain transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const proof: RegistrationProof = {
        prompt,
        contentHash: hash,
        transactionId: `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        blockNumber: Math.floor(Date.now() / 10000) - 170000000,
        timestamp: new Date().toISOString(),
      };
      setRegistrationProof(proof);

    } catch (err) {
       setError('Failed to create registration proof.');
    } finally {
      setIsRegistering(false);
    }
  }, [prompt, generatedContent]);

  const handleSaveDraft = useCallback(() => {
    try {
      const draft = { prompt, generatedContent };
      localStorage.setItem('proofOfPromptDraft', JSON.stringify(draft));
      showDraftMessage('Draft saved successfully!');
    } catch (e) {
      setError('Failed to save draft. Your browser might not support localStorage or it is full.');
    }
  }, [prompt, generatedContent]);

  const handleLoadDraft = useCallback(() => {
    try {
      const savedDraft = localStorage.getItem('proofOfPromptDraft');
      if (savedDraft) {
        const { prompt: savedPrompt, generatedContent: savedContent } = JSON.parse(savedDraft);
        setPrompt(savedPrompt);
        setGeneratedContent(savedContent || '');
        setRegistrationProof(null); // Clear old proof as it's a draft
        setError(null);
        showDraftMessage('Draft loaded successfully!');
      } else {
        showDraftMessage('No saved draft found.');
      }
    } catch (e) {
      setError('Failed to load draft. The saved data might be corrupted.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans antialiased">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header />

        <div className="max-w-3xl mx-auto mt-10 space-y-8">
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            onSaveDraft={handleSaveDraft}
            onLoadDraft={handleLoadDraft}
          />

          {draftMessage && (
            <div className="bg-cyan-900/50 border border-cyan-700 text-cyan-300 px-4 py-3 rounded-lg animate-fade-in" role="status">
              <span className="block sm:inline">{draftMessage}</span>
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <GeneratedContent
            content={generatedContent}
            isGenerating={isGenerating}
            isRegistering={isRegistering}
            onRegister={handleRegister}
            hasProof={!!registrationProof}
          />
          
          {registrationProof && <ProofDisplay proof={registrationProof} content={generatedContent} />}
        </div>
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Proof-of-Prompt &copy; {new Date().getFullYear()}. A Hackathon Project.</p>
      </footer>
    </div>
  );
};

export default App;