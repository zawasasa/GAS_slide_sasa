
import React from 'react';
import PromptThemeSelector from './PromptThemeSelector';
import ColorPaletteSelector from './ColorPaletteSelector';
import { FileUpload } from './FileUpload';

interface Logo {
  name: string;
  dataUrl: string;
}
interface InputAreaProps {
  text: string;
  setText: (text: string) => void;
  promptTheme: string;
  setPromptTheme: (theme: string) => void;
  colorPalette: string;
  setColorPalette: (palette: string) => void;
  logo: Logo | null;
  onLogoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoRemove: () => void;
  copyright: string;
  setCopyright: (text: string) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ 
  text, setText, 
  promptTheme, setPromptTheme,
  colorPalette, setColorPalette,
  logo, onLogoChange, onLogoRemove,
  copyright, setCopyright,
  isLoading 
}) => {
  const handleFileContent = (content: string, fileName: string) => {
    setText(content);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-8">
      
      <div>
        <h2 className="text-lg font-medium text-gray-900">1. コンテンツを入力</h2>
        <p className="mt-1 text-sm text-gray-500">
テキストを貼り付けるか、その他の方法でプレゼンテーションのコンテンツを提供してください。
        </p>
        <div className="mt-4 space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="コンテンツをここに貼り付けてください...（例：会議メモ、ブログ記事、プロジェクト概要）"
            className="w-full h-60 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 resize-y text-sm"
            disabled={isLoading}
          />
          {/* File upload section */}
          <div className="flex items-center justify-center text-sm text-gray-400">
             <span className="flex-shrink-0 px-2">OR</span>
             <div className="w-full h-px bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FileUpload 
              onFileContent={handleFileContent}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900">2. プロンプトテーマを選択</h2>
        <p className="mt-1 text-sm text-gray-500">
          AIがプレゼンテーションの言葉遣いとスタイルを選択したテーマに合わせて調整します。
        </p>
        <PromptThemeSelector
          selectedTheme={promptTheme}
          setSelectedTheme={setPromptTheme}
          disabled={isLoading}
        />
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900">3. 配色パレットを選択</h2>
        <p className="mt-1 text-sm text-gray-500">
          スライドの色使いを選択したカラーパレットに合わせて調整します。
        </p>
        <ColorPaletteSelector
          selectedPalette={colorPalette}
          setSelectedPalette={setColorPalette}
          disabled={isLoading}
        />
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900">4. ロゴを追加（任意）</h2>
        <p className="mt-1 text-sm text-gray-500">
スライドの右上に配置するロゴ（PNG、JPEG）をアップロードしてください。
        </p>
        <div className="mt-4">
          {logo ? (
            <div className="flex items-center space-x-4 p-2 border border-gray-200 rounded-lg bg-gray-50">
              <img src={logo.dataUrl} alt="Logo Preview" className="h-12 w-12 object-contain bg-white rounded" />
              <div className="flex-grow min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{logo.name}</p>
                <p className="text-xs text-gray-500">ロゴがスライドに追加されます。</p>
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
                className={`flex flex-col justify-center items-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center transition-colors duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${
                  isLoading ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                }`}
                role="button"
                aria-describedby="logo-upload-description"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">クリックしてロゴをアップロード</p>
                <p id="logo-upload-description" className="text-xs text-gray-500">PNG or JPG</p>
              </label>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900">5. 著作権テキスト（任意）</h2>
        <p className="mt-1 text-sm text-gray-500">
すべてのスライドの左下に表示される著作権テキストを設定してください。
        </p>
        <div className="mt-4">
          <input
            type="text"
            value={copyright}
            onChange={(e) => setCopyright(e.target.value)}
            placeholder="© 2025 Your Organization"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 text-sm"
            disabled={isLoading}
          />
          <p className="mt-1 text-xs text-gray-500">
空の場合はデフォルトを使用："© {new Date().getFullYear()} Your Organization"
          </p>
        </div>
      </div>

    </div>
  );
};

export default InputArea;

