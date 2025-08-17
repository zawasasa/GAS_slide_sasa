
import React from 'react';
import ThemeSelector from './ThemeSelector';

interface Logo {
  name: string;
  dataUrl: string;
}
interface InputAreaProps {
  text: string;
  setText: (text: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  logo: Logo | null;
  onLogoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoRemove: () => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ 
  text, setText, 
  theme, setTheme, 
  logo, onLogoChange, onLogoRemove,
  isLoading 
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-8">
      
      <div>
        <h2 className="text-lg font-medium text-gray-900">1. Provide Content</h2>
        <p className="mt-1 text-sm text-gray-500">
          Paste your text, or use one of the other methods to provide content for your presentation.
        </p>
        <div className="mt-4 space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your content here... (e.g., meeting notes, a blog post, or a project brief)"
            className="w-full h-60 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 resize-y text-sm"
            disabled={isLoading}
          />
          {/* Future feature placeholders */}
          <div className="flex items-center justify-center text-sm text-gray-400">
             <span className="flex-shrink-0 px-2">OR</span>
             <div className="w-full h-px bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button disabled className="w-full p-3 border border-dashed border-gray-300 rounded-lg text-gray-400 cursor-not-allowed text-center">
              Upload File (.md, .txt)
              <span className="block text-xs">Coming Soon</span>
            </button>
             <button disabled className="w-full p-3 border border-dashed border-gray-300 rounded-lg text-gray-400 cursor-not-allowed text-center">
              Import from URL
              <span className="block text-xs">Coming Soon</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900">2. Select a Theme</h2>
        <p className="mt-1 text-sm text-gray-500">
          The AI will adapt the tone and style of the presentation to your chosen theme.
        </p>
        <ThemeSelector
          selectedTheme={theme}
          setSelectedTheme={setTheme}
          disabled={isLoading}
        />
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900">3. Add a Logo (Optional)</h2>
        <p className="mt-1 text-sm text-gray-500">
          Upload a logo (PNG, JPEG) to be placed on the top-right of your slides.
        </p>
        <div className="mt-4">
          {logo ? (
            <div className="flex items-center space-x-4 p-2 border border-gray-200 rounded-lg bg-gray-50">
              <img src={logo.dataUrl} alt="Logo Preview" className="h-12 w-12 object-contain bg-white rounded" />
              <div className="flex-grow min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{logo.name}</p>
                <p className="text-xs text-gray-500">Logo will be added to slides.</p>
              </div>
              <button
                onClick={onLogoRemove}
                disabled={isLoading}
                className="flex-shrink-0 p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                aria-label="Remove logo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="file"
                id="logo-upload"
                accept="image/png, image/jpeg"
                onChange={onLogoChange}
                disabled={isLoading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload logo"
              />
              <label
                htmlFor="logo-upload"
                className={`flex flex-col justify-center items-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center transition-colors duration-200 ${
                  isLoading ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">Click to upload logo</p>
                <p className="text-xs text-gray-500">PNG or JPG</p>
              </label>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default InputArea;
