
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
  const [theme, setTheme] = useState('Default');
  const [logo, setLogo] = useState<Logo | null>(null);
  
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
      reader.readAsDataURL(file);
    }
    event.target.value = ''; // Allow re-uploading the same file
  };

  const handleLogoRemove = () => {
    setLogo(null);
  };

  const handleGenerateCode = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to generate the script from.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedCode(null);
    setStatusMessage(''); 

    try {
      setStatusMessage('Analyzing text and generating slide data...');
      const slideDataCode = await generateSlideDataFromText(inputText, theme);

      setStatusMessage('Constructing final GAS script...');
      let fullScript = GOOGLE_TEMPLATE_BLUEPRINT.replace(
        '// SLIDEDATA_PLACEHOLDER',
        slideDataCode
      );
      
      fullScript = fullScript.replace(
        '"LOGO_BASE64_PLACEHOLDER"',
        logo ? `'${logo.dataUrl}'` : 'null'
      );

      setGeneratedCode(fullScript);
      setStatusMessage('Success! Your GAS code is ready.');

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setStatusMessage('Failed to generate code.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, theme, logo]);
  
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
            theme={theme}
            setTheme={setTheme}
            logo={logo}
            onLogoChange={handleLogoChange}
            onLogoRemove={handleLogoRemove}
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