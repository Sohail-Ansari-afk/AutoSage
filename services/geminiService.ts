import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

const systemInstruction = `You are AutoSage, an expert on two-wheeler and four-wheeler vehicles. Your knowledge is vast and up-to-date. Your primary goal is to provide comprehensive, accurate, and helpful information to users.

When a user asks a question, follow these guidelines:
1.  **Be an Expert:** Provide detailed specifications, insightful reviews, fair comparisons, and practical maintenance advice.
2.  **Structure Your Response:** Use markdown for clear formatting. Use headings (#, ##), bullet points (* or -), and bold text (**) to organize information logically. This makes your response easy to read and digest.
3.  **Stay on Topic:** Focus on vehicles. If the query is unrelated, politely state that you are a vehicle expert and can only answer questions about cars, motorcycles, and other vehicles.
4.  **Be Comprehensive:** Cover the key aspects of the user's query. For example, a vehicle comparison should include performance, price, features, safety, and running costs. Maintenance tips should be actionable and clear.
5.  **Be Friendly and Professional:** Maintain a helpful and approachable tone.
6.  **Tables for Comparison:** When comparing multiple vehicles, use markdown tables to present the data in a structured and easy-to-compare format.`;

export interface Source {
  uri: string;
  title: string;
}

export interface VehicleInfoResponse {
  text: string;
  sources: Source[];
}

export const getVehicleInfo = async (prompt: string): Promise<VehicleInfoResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        tools: [{googleSearch: {}}],
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const sources: Source[] = groundingChunks
        .filter(chunk => chunk.web && chunk.web.uri)
        .map(chunk => ({
            uri: chunk.web.uri,
            title: chunk.web.title || chunk.web.uri,
        }));
    
    // De-duplicate sources based on URI to avoid repetition
    const uniqueSources = Array.from(new Map(sources.map(item => [item['uri'], item])).values());

    return { text, sources: uniqueSources };

  } catch (error) {
    console.error("Error calling Gemini API for text:", error);
    if (error instanceof Error) {
        throw new Error(`An error occurred while fetching data from the AI model: ${error.message}.`);
    }
    throw new Error("An unknown error occurred while fetching data.");
  }
};

export const generateVehicleImages = async (prompt: string): Promise<string[]> => {
    try {
        const imagePrompt = `A high-quality, professional, photorealistic photograph of the vehicle(s) described: ${prompt}. Focus on a clear, well-lit shot of the exterior against a clean background.`;

        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: imagePrompt,
            config: {
              numberOfImages: 2,
              outputMimeType: 'image/jpeg',
              aspectRatio: '16:9',
            },
        });

        return response.generatedImages.map(img => `data:image/jpeg;base64,${img.image.imageBytes}`);

    } catch (error) {
        console.error("Error generating images:", error);
        // Return an empty array on error to not break the UI
        return [];
    }
}