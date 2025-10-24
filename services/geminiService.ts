
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a placeholder for environments where the key might not be set.
  // The execution environment is expected to have this variable.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateContentFromPrompt = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    // Simulate a delay and return mock data if API key is not available
    await new Promise(resolve => setTimeout(resolve, 1500));
    return `This is a mocked AI response for the prompt: "${prompt}". In a real environment with an API key, Gemini would generate content here. For example, it might be a short story about a brave knight, a poem about the stars, or a technical explanation of a complex topic. The possibilities are endless.`;
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an AI specialized in creative content generation. Based on the following user prompt, generate a unique and compelling piece of content (e.g., a short story, a poem, an article intro, a product description). The output should be concise and directly address the prompt.\n\nPROMPT: "${prompt}"\n\nCONTENT:`,
        config: {
          temperature: 0.8,
          topP: 0.9,
          maxOutputTokens: 512,
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    // Provide a more user-friendly error message
    if (error instanceof Error && error.message.includes('API key not valid')) {
       throw new Error("The Gemini API key is invalid. Please check your configuration.");
    }
    throw new Error("Failed to generate content from AI. The service may be temporarily unavailable.");
  }
};
