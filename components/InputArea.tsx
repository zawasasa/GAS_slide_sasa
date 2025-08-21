
import React, { useState } from 'react';
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
  onHtmlContent?: (htmlContent: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ 
  text, setText, 
  promptTheme, setPromptTheme,
  colorPalette, setColorPalette,
  logo, onLogoChange, onLogoRemove,
  copyright, setCopyright,
  isLoading,
  onHtmlContent
}) => {
  const [isImageMarkdown, setIsImageMarkdown] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const handleFileContent = (content: string, fileName: string, htmlContent?: string, hasImages?: boolean) => {
    if (hasImages && htmlContent && onHtmlContent) {
      // 画像付きMDファイルの場合、HTMLコンテンツを親コンポーネントに渡す
      onHtmlContent(htmlContent);
      setText(content); // テキストエリアにはプレーンテキストを表示
      setIsImageMarkdown(true);
    } else {
      setText(content);
      setIsImageMarkdown(false);
      if (onHtmlContent) {
        onHtmlContent(''); // HTMLコンテンツをクリア
      }
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // テキストエリアが手動で編集された場合、画像Markdownモードを解除
    if (isImageMarkdown) {
      setIsImageMarkdown(false);
      if (onHtmlContent) {
        onHtmlContent('');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-8">
      
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">1. コンテンツを入力</h2>
            <p className="mt-1 text-sm text-gray-500">
              テキストを貼り付けるか、その他の方法でプレゼンテーションのコンテンツを提供してください。
            </p>
          </div>
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            disabled={isLoading}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>おすすめの使い方</span>
            <svg 
              className={`h-4 w-4 transition-transform duration-200 ${showTips ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {/* トグル可能なTips */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showTips ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">
                  💡{' '}
                  <a 
                    href="https://chromewebstore.google.com/detail/obsidian-web-clipper/cnjifjpddelmedmihgijeibhnjfabmlf?hl=ja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-900 hover:text-blue-700 underline hover:no-underline transition-colors duration-200"
                  >
                    Obsidian Web Clipper
                  </a>
                  {' '}+ MDファイルがおすすめ！
                </h3>
                <div className="space-y-3 text-sm text-blue-800">
                  <div className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <div>
                      <p className="font-medium">📸 画像付きスライドを自動生成</p>
                      <p className="text-blue-700">
                        <a 
                          href="https://chromewebstore.google.com/detail/obsidian-web-clipper/cnjifjpddelmedmihgijeibhnjfabmlf?hl=ja"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:text-blue-600 underline hover:no-underline transition-colors duration-200"
                        >
                          Obsidian Web Clipper
                        </a>
                        で保存した画像リンク付きMDファイルをアップロードすると、画像も含めたスライドショーが作成されます。
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <div>
                      <p className="font-medium">🎯 構造化されたコンテンツ</p>
                      <p className="text-blue-700">見出し、リスト、画像が整理されたMDファイルは、より美しく分かりやすいスライドを生成します。</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <div>
                      <p className="font-medium">⚡ ワンクリックで記事→スライド</p>
                      <p className="text-blue-700">
                        Web記事を
                        <a 
                          href="https://chromewebstore.google.com/detail/obsidian-web-clipper/cnjifjpddelmedmihgijeibhnjfabmlf?hl=ja"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:text-blue-600 underline hover:no-underline transition-colors duration-200 mx-1"
                        >
                          Obsidian Web Clipper
                        </a>
                        で保存 → このアプリにアップロード → 完成！
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                  <p className="text-xs text-blue-600">
                    💡 <span className="font-medium">ヒント:</span> もちろん普通のテキストでも高品質なスライドが作成できます。MDファイルは特に画像やレイアウトを活かしたい場合におすすめです。
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-2">
                    <p className="text-xs text-amber-800">
                      ⚠️ <span className="font-semibold">注意:</span> 読み込んだ画像はレイアウト上きれいに配置されないため、生成後にGoogleスライドで手動調整が必要です。また、不必要な画像は出力した後にGoogleスライド上で削除してご利用ください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          {isImageMarkdown && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-green-800">
                      🎉 画像付きMarkdownファイルを検出しました！
                    </span>
                  </div>
                  <p className="text-sm text-green-700 mt-2">
                    画像リンクを含むスライドショーが生成されます。テキストエリアにはプレビュー用のテキストが表示されていますが、実際のスライドには画像も含まれます。
                  </p>
                  <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-xs text-amber-800">
                      ⚠️ <span className="font-semibold">重要:</span> 画像のレイアウトは手動調整が必要です。また、不必要な画像は出力した後にGoogleスライド上で削除してご利用ください。
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-green-600">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <a 
                      href="https://chromewebstore.google.com/detail/obsidian-web-clipper/cnjifjpddelmedmihgijeibhnjfabmlf?hl=ja"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-500 underline hover:no-underline transition-colors duration-200"
                    >
                      Obsidian Web Clipper
                    </a>
                    の力を最大限に活用できます
                  </div>
                </div>
              </div>
            </div>
          )}
          <textarea
            value={text}
            onChange={handleTextChange}
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

