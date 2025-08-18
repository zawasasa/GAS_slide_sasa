import React from 'react';
import { PROMPT_THEMES, PromptTheme } from '../constants/promptThemes';

interface PromptThemeSelectorProps {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  disabled?: boolean;
}

const PromptThemeSelector: React.FC<PromptThemeSelectorProps> = ({
  selectedTheme,
  setSelectedTheme,
  disabled = false
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROMPT_THEMES.map((theme) => (
          <div
            key={theme.id}
            className={`
              relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
              ${selectedTheme === theme.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 bg-white'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={() => !disabled && setSelectedTheme(theme.id)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <input
                  type="radio"
                  name="promptTheme"
                  value={theme.id}
                  checked={selectedTheme === theme.id}
                  onChange={() => !disabled && setSelectedTheme(theme.id)}
                  disabled={disabled}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {theme.name}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {theme.description}
                </p>
                <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-700">
                  <strong>言葉遣い・トーン:</strong> {theme.prompt}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptThemeSelector;
