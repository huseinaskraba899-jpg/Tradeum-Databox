import { GoogleGenAI } from "@google/genai";
import { Product, Language } from "../types";

const defaultEnvApiKey = process.env.API_KEY;

export const generateProductContent = async (product: Product, lang: Language, customApiKey?: string): Promise<{ title: string; description: string; category: string }> => {
  
  // Use custom key if provided, otherwise fallback to env key
  const apiKey = customApiKey || defaultEnvApiKey;

  if (!apiKey) {
    throw new Error("API Key not found. Please set the API Key in configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const targetLanguage = lang === 'ch' ? 'Swiss German (Standard German with swiss nuances if appropriate for e-commerce, otherwise Standard German)' : lang === 'de' ? 'German' : 'English';

  const prompt = `
    You are an expert E-commerce Copywriter for a Shopify store.
    
    Task: Optimize the following raw product data from a wholesaler into high-converting, SEO-friendly content in ${targetLanguage}.
    
    Raw Data:
    - Product: ${product.rawTitle}
    - Raw Description: ${product.rawDescription}
    - Price: ${product.sellPrice} EUR
    
    Requirements:
    1. Title: Create a catchy, SEO-friendly title in ${targetLanguage} (max 70 chars).
    2. Description: Write a persuasive HTML product description in ${targetLanguage} (approx 100 words) with bullet points for features.
    3. Category: Suggest the best Shopify Product Taxonomy category (in English or German, whichever is standard for Shopify).
    
    Output strictly valid JSON with keys: "title", "description", "category". Do not wrap in markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const data = JSON.parse(text);
    return {
      title: data.title,
      description: data.description,
      category: data.category
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};