import React, { useState, useRef, useCallback } from 'react';
import { processFile, FileContent, SUPPORTED_FORMATS } from '../utils/fileProcessor';

interface FileUploadProps {
  onFileContent: (content: string, fileName: string, htmlContent?: string, hasImages?: boolean) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileContent, className = '' }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = useCallback(async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const fileContent = await processFile(file);
      onFileContent(fileContent.content, fileContent.fileName, fileContent.htmlContent, fileContent.hasImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ファイルの処理に失敗しました。');
    } finally {
      setIsProcessing(false);
    }
  }, [onFileContent]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
    // 同じファイルを再度選択できるようにリセット
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleFileProcess]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  }, [handleFileProcess]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const supportedFormatsText = [
    ...SUPPORTED_FORMATS.text,
    ...SUPPORTED_FORMATS.markdown
  ].join(', ');

  return (
    <div className={`file-upload-container ${className}`}>
      <div
        className={`
          file-drop-zone
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={isProcessing ? undefined : handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={supportedFormatsText}
          onChange={handleFileSelect}
          className="hidden"
          disabled={isProcessing}
        />
        
        <div className="space-y-2">
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              <span className="text-gray-600">ファイルを処理中...</span>
            </div>
          ) : (
            <>
              <div className="text-gray-600">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-gray-600">
                <span className="font-medium text-blue-600 hover:text-blue-500">
                  ファイルをクリックしてアップロード
                </span>
                {' '}またはドラッグ&ドロップ
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">
                  対応形式: {supportedFormatsText} (最大5MB)
                </p>
                <p className="text-xs text-blue-600 font-medium">
                  📝 画像付きコンテンツには.mdファイルがおすすめ
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};
