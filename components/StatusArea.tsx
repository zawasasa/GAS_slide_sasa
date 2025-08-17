import React, { useState } from 'react';
import Loader from './Loader';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

interface StatusAreaProps {
  isLoading: boolean;
  error: string | null;
  statusMessage: string;
  generatedCode: string | null;
  onGenerate: () => void;
  onReset: () => void;
  isReadyToCreate: boolean;
}

const StatusArea: React.FC<StatusAreaProps> = ({
  isLoading,
  error,
  statusMessage,
  generatedCode,
  onGenerate,
  onReset,
  isReadyToCreate
}) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2500);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-lg text-gray-600 font-medium">Generating GAS Code...</p>
          <p className="text-sm text-gray-500">{statusMessage}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center">
           <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
           <h3 className="mt-2 text-lg font-medium text-red-800">Operation Failed</h3>
           <p className="mt-1 text-sm text-red-600 max-w-md mx-auto">{error}</p>
           <button
              onClick={onReset}
              className="mt-6 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Try Again
            </button>
        </div>
      );
    }
    
    if (generatedCode) {
        return (
            <div className="text-left w-full h-full flex flex-col">
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">GAS Code Generated</h3>
                    <p className="mt-1 text-sm text-gray-600">Copy the code below into the Google Apps Script editor.</p>
                </div>
                <div className="mt-4 relative flex-grow flex flex-col">
                    <textarea
                        readOnly
                        value={generatedCode}
                        className="w-full flex-grow p-3 font-mono text-xs bg-gray-100 border border-gray-300 rounded-md resize-none"
                        aria-label="Generated GAS Code"
                    />
                    <button 
                        onClick={handleCopy}
                        className="absolute top-2 right-2 inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        {hasCopied ? <CheckIcon /> : <CopyIcon />}
                        <span className="ml-2">{hasCopied ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                </div>
                 <div className="mt-4 text-center">
                    <button
                        onClick={onReset}
                        className="w-full inline-flex justify-center items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Generate Another Script
                    </button>
                </div>
            </div>
        )
    }
    
    // Default state: Ready to generate
    return (
        <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">4. Generate GAS Code</h3>
            <p className="mt-1 text-sm text-gray-500">
            When you're ready, click the button to generate the Google Apps Script code based on your content.
            </p>
            <button
                onClick={onGenerate}
                disabled={!isReadyToCreate}
                className="mt-6 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Generate GAS Code
            </button>
             {!isReadyToCreate && <p className="mt-2 text-xs text-gray-500">Please provide some content in Step 1 first.</p>}
        </div>
    )
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-center min-h-[26rem] bg-gray-50 rounded-lg p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default StatusArea;