import { marked } from 'marked';

export interface FileContent {
  content: string;
  fileName: string;
  fileType: 'text' | 'markdown';
}

export const SUPPORTED_FORMATS = {
  text: ['.txt'],
  markdown: ['.md', '.markdown']
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function getFileType(fileName: string): 'text' | 'markdown' | null {
  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
  
  if (SUPPORTED_FORMATS.text.includes(extension)) {
    return 'text';
  }
  
  if (SUPPORTED_FORMATS.markdown.includes(extension)) {
    return 'markdown';
  }
  
  return null;
}

export function validateFile(file: File): { isValid: boolean; error?: string } {
  // ファイルサイズチェック
  if (file.size > MAX_FILE_SIZE) {
    return { 
      isValid: false, 
      error: `ファイルサイズが大きすぎます。最大${MAX_FILE_SIZE / 1024 / 1024}MBまで対応しています。` 
    };
  }
  
  // ファイル形式チェック
  const fileType = getFileType(file.name);
  if (!fileType) {
    return { 
      isValid: false, 
      error: 'サポートされていないファイル形式です。.txt または .md ファイルを選択してください。' 
    };
  }
  
  return { isValid: true };
}

export async function processTextFile(file: File): Promise<FileContent> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result as string;
      resolve({
        content: content || '',
        fileName: file.name,
        fileType: 'text'
      });
    };
    
    reader.onerror = () => {
      reject(new Error('ファイルの読み込みに失敗しました。'));
    };
    
    reader.readAsText(file, 'UTF-8');
  });
}

export async function processMarkdownFile(file: File): Promise<FileContent> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const markdownContent = e.target?.result as string;
      
      try {
        // MarkdownをHTMLに変換してからテキストを抽出
        const htmlContent = marked.parse(markdownContent) as string;
        
        // HTMLタグを除去してプレーンテキストに変換
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        
        resolve({
          content: plainText,
          fileName: file.name,
          fileType: 'markdown'
        });
      } catch (error) {
        reject(new Error('Markdownファイルの処理に失敗しました。'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('ファイルの読み込みに失敗しました。'));
    };
    
    reader.readAsText(file, 'UTF-8');
  });
}

export async function processFile(file: File): Promise<FileContent> {
  const validation = validateFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }
  
  const fileType = getFileType(file.name);
  
  switch (fileType) {
    case 'text':
      return processTextFile(file);
    case 'markdown':
      return processMarkdownFile(file);
    default:
      throw new Error('サポートされていないファイル形式です。');
  }
}
