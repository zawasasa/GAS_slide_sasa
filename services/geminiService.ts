import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

const API_KEY = (import.meta as any).env?.VITE_API_KEY;

// Initialize AI only if API key is available
let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

/**
 * Extracts the `const slideData = [...]` block from the full script text.
 * @param aiResponse The complete script content returned by the AI.
 * @returns The extracted slideData code block.
 */
function extractSlideData(aiResponse: string): string {
  // First, try to find a Javascript code block
  const markdownMatch = aiResponse.match(/```(?:javascript|js)\n([\s\S]*?)\n```/);
  const content = markdownMatch ? markdownMatch[1] : aiResponse;

  const slideDataMatch = content.match(/const slideData\s*=\s*\[[\s\S]*?\];/);

  if (slideDataMatch) {
    return slideDataMatch[0];
  }
  
  // If no specific block is found, check if the response IS the slideData array content.
  if (content.trim().startsWith('const slideData = [')) {
    return content.trim();
  }

  throw new Error("Could not find 'const slideData = [...]' in the AI's response.");
}

/**
 * Generates a `slideData` object array from unstructured text and a theme.
 * @param unstructuredText The user's input text (notes, articles, etc.).
 * @param theme The selected presentation theme.
 * @returns A promise that resolves to the generated `slideData` code as a string.
 */
export async function generateSlideDataFromText(unstructuredText: string, promptTheme: string, colorPalette: string, customFooterText?: string): Promise<string> {
  if (!ai) {
    throw new Error("VITE_API_KEY environment variable not set. Please set your Google Gemini API key in the .env file.");
  }

  try {
    const footerInstruction = customFooterText ? `\n\n## **CUSTOM_FOOTER_TEXT**\n\n'${customFooterText}'\n\n**重要**: 生成するslideDataの各要素に customFooterText: '${customFooterText}' プロパティを追加してください。` : '';
    const fullPrompt = `${SYSTEM_PROMPT}\n\n---\n\n## **USER_INPUT_TEXT**\n\n${unstructuredText}\n\n## **SELECTED_PROMPT_THEME**\n\n'${promptTheme}'\n\n## **SELECTED_COLOR_PALETTE**\n\n'${colorPalette}'${footerInstruction}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    
    const rawText = response.text;
    if (!rawText) {
      throw new Error("The AI returned an empty response.");
    }

    return extractSlideData(rawText);

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate slides: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the AI.");
  }
}
