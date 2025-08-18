
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputArea from './components/InputArea';
import StatusArea from './components/StatusArea';
import { generateSlideDataFromText } from './services/geminiService';
import { GOOGLE_TEMPLATE_BLUEPRINT } from './constants';

interface Logo {
  name: string;
  dataUrl: string;
}

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [promptTheme, setPromptTheme] = useState('simple');
  const [colorPalette, setColorPalette] = useState('simple-default');
  const [logo, setLogo] = useState<Logo | null>(null);
  const [copyright, setCopyright] = useState('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo({
          name: file.name,
          dataUrl: reader.result as string,
        });
      };
      reader.onerror = () => {
        setError('ロゴファイルの読み込みに失敗しました。');
      };
      reader.readAsDataURL(file);
    }
    event.target.value = ''; // Allow re-uploading the same file
  };

  const handleLogoRemove = () => {
    setLogo(null);
  };

  const handleGenerateCode = useCallback(async () => {
    if (!inputText.trim()) {
      setError('スクリプトを生成するためにテキストを入力してください。');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedCode(null);
    setStatusMessage(''); 

    try {
      setStatusMessage('テキストを分析し、スライドデータを生成中...');
      const slideDataCode = await generateSlideDataFromText(inputText, promptTheme, colorPalette, copyright);

      setStatusMessage('最終的なGASスクリプトを構築中...');
      let fullScript = GOOGLE_TEMPLATE_BLUEPRINT.replace(
        '// SLIDEDATA_PLACEHOLDER',
        slideDataCode
      );
      
      fullScript = fullScript.replace(
        '"LOGO_BASE64_PLACEHOLDER"',
        logo ? `'${logo.dataUrl}'` : 'null'
      );
      
      // コピーライトテキストを置換
      const copyrightText = copyright.trim() || `© ${new Date().getFullYear()} Your Organization`;
      fullScript = fullScript.replace(
        "FOOTER_TEXT: '© ' + new Date().getFullYear() + ' Your Organization'",
        `FOOTER_TEXT: '${copyrightText.replace(/'/g, "\\'")}'`
      );
      
      // 別のパターンも置換（念のため）
      fullScript = fullScript.replace(
        /CONFIG\.FOOTER_TEXT\s*=\s*['"][^'"]*['"]/g,
        `CONFIG.FOOTER_TEXT = '${copyrightText.replace(/'/g, "\\'")}'`
      );

      setGeneratedCode(fullScript);
      setStatusMessage('成功！GASコードの準備ができました。');

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました。');
      setStatusMessage('コードの生成に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, promptTheme, colorPalette, logo, copyright]);
  
  const handleReset = () => {
    setGeneratedCode(null);
    setError(null);
    setStatusMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <InputArea
            text={inputText}
            setText={setInputText}
            promptTheme={promptTheme}
            setPromptTheme={setPromptTheme}
            colorPalette={colorPalette}
            setColorPalette={setColorPalette}
            logo={logo}
            onLogoChange={handleLogoChange}
            onLogoRemove={handleLogoRemove}
            copyright={copyright}
            setCopyright={setCopyright}
            isLoading={isLoading}
          />
          
          <div className="w-full lg:sticky lg:top-8">
            <StatusArea
              isLoading={isLoading}
              error={error}
              statusMessage={statusMessage}
              generatedCode={generatedCode}
              onGenerate={handleGenerateCode}
              onReset={handleReset}
              isReadyToCreate={!!inputText.trim()}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;