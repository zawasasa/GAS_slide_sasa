import React from 'react';

const THEMES = [
  { name: "Default", color: "bg-gray-400" },
  { name: "Simple", color: "bg-blue-400" },
  { name: "Business", color: "bg-gray-800" },
  { name: "Creative", color: "bg-purple-500" },
  { name: "For Kids", color: "bg-yellow-400" },
];

interface ThemeSelectorProps {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  disabled: boolean;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, setSelectedTheme, disabled }) => {
  return (
    <div className={`mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {THEMES.map((theme) => (
        <button
          key={theme.name}
          type="button"
          onClick={() => !disabled && setSelectedTheme(theme.name)}
          className={`relative p-3 rounded-lg border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            ${selectedTheme === theme.name ? 'border-blue-500' : 'border-gray-200 hover:border-gray-400'}
            ${disabled ? 'pointer-events-none' : ''}`}
        >
          <div className="flex items-center justify-center">
            <span className={`w-5 h-5 rounded-full ${theme.color}`}></span>
          </div>
          <p className="mt-2 text-center text-sm font-medium text-gray-700">{theme.name}</p>
          {selectedTheme === theme.name && (
            <div className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-blue-500 rounded-full text-white flex items-center justify-center">
              <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
