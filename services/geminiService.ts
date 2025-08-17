import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

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
export async function generateSlideDataFromText(unstructuredText: string, theme: string): Promise<string> {
  try {
    const fullPrompt = `${SYSTEM_PROMPT}\n\n---\n\n## **USER_INPUT_TEXT**\n\n${unstructuredText}\n\n## **SELECTED_THEME**\n\n'${theme}'`;

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
