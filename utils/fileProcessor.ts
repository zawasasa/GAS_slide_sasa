import { marked } from 'marked';
import * as pdfjsLib from 'pdfjs-dist';

// PDF.js Worker設定
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export interface FileContent {
  content: string;
  fileName: string;
  fileType: 'text' | 'markdown' | 'pdf';
}

export const SUPPORTED_FORMATS = {
  text: ['.txt'],
  markdown: ['.md', '.markdown'],
  pdf: ['.pdf']
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function getFileType(fileName: string): 'text' | 'markdown' | 'pdf' | null {
  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
  
  if (SUPPORTED_FORMATS.text.includes(extension)) {
    return 'text';
  }
  
  if (SUPPORTED_FORMATS.markdown.includes(extension)) {
    return 'markdown';
  }
  
  if (SUPPORTED_FORMATS.pdf.includes(extension)) {
    return 'pdf';
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
      error: 'サポートされていないファイル形式です。.txt、.md、または .pdf ファイルを選択してください。' 
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

export async function processPdfFile(file: File): Promise<FileContent> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        let fullText = '';
        
        // 各ページのテキストを抽出
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          // テキスト要素を結合
          const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ');
          
          fullText += pageText + '\n\n';
        }
        
        resolve({
          content: fullText.trim(),
          fileName: file.name,
          fileType: 'pdf'
        });
      } catch (error) {
        reject(new Error('PDFファイルの処理に失敗しました。'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('ファイルの読み込みに失敗しました。'));
    };
    
    reader.readAsArrayBuffer(file);
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
    case 'pdf':
      return processPdfFile(file);
    default:
      throw new Error('サポートされていないファイル形式です。');
  }
}
