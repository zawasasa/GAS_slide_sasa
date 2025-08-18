import React from 'react';
import { COLOR_PALETTES, ColorPalette } from '../constants/colorPalettes';

interface ColorPaletteSelectorProps {
  selectedPalette: string;
  setSelectedPalette: (palette: string) => void;
  disabled?: boolean;
}

const ColorPaletteSelector: React.FC<ColorPaletteSelectorProps> = ({
  selectedPalette,
  setSelectedPalette,
  disabled = false
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COLOR_PALETTES.map((palette) => (
          <div
            key={palette.id}
            className={`
              relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
              ${selectedPalette === palette.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 bg-white'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={() => !disabled && setSelectedPalette(palette.id)}
          >
            <div className="space-y-3">
              {/* カラーパレットプレビュー */}
              <div className="flex h-8 rounded overflow-hidden">
                <div 
                  className="flex-1" 
                  style={{ backgroundColor: palette.colors.primary }}
                  title="Primary"
                />
                <div 
                  className="flex-1" 
                  style={{ backgroundColor: palette.colors.secondary }}
                  title="Secondary"
                />
                <div 
                  className="flex-1" 
                  style={{ backgroundColor: palette.colors.accent }}
                  title="Accent"
                />
                <div 
                  className="flex-1" 
                  style={{ backgroundColor: palette.colors.background }}
                  title="Background"
                />
                <div 
                  className="flex-1" 
                  style={{ backgroundColor: palette.colors.text }}
                  title="Text"
                />
              </div>
              
              {/* テーマ情報 */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <input
                    type="radio"
                    name="colorPalette"
                    value={palette.id}
                    checked={selectedPalette === palette.id}
                    onChange={() => !disabled && setSelectedPalette(palette.id)}
                    disabled={disabled}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900">
                      {palette.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {palette.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPaletteSelector;
