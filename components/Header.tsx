import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 max-w-7xl flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <svg className="h-8 w-auto text-blue-500" viewBox="0 0 48 48" fill="none" xmlns="http://www.w.org/2000/svg">
              <path d="M42 6H6C4.89543 6 4 6.89543 4 8V40C4 41.1046 4.89543 42 6 42H42C43.1046 42 44 41.1046 44 40V8C44 6.89543 43.1046 6 42 6Z" fill="#4285F4"/>
              <path d="M30 14H18V20H30V14Z" fill="white"/>
              <path d="M36 26H12V32H36V26Z" fill="white"/>
          </svg>
          <div>
            <h1 className="text-xl font-semibold text-gray-800 tracking-tight">GAS Code Generator</h1>
            <p className="text-sm text-gray-500">AI-Powered Script Automation</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;