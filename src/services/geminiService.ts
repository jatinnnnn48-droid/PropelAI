import { GoogleGenAI, Type } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export interface BusinessEvaluation {
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  riskAssessment: string;
  strategicSuggestions: string[];
  overallScore: number;
  summary: string;
}

export async function evaluateBusinessProposal(description: string): Promise<BusinessEvaluation> {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Evaluate the following business proposal and provide a detailed analysis in JSON format.
    
    Business Proposal:
    "${description}"
    
    The response must follow this JSON schema:
    {
      "swot": {
        "strengths": ["string"],
        "weaknesses": ["string"],
        "opportunities": ["string"],
        "threats": ["string"]
      },
      "riskAssessment": "string (detailed markdown text)",
      "strategicSuggestions": ["string"],
      "overallScore": number (0-100),
      "summary": "string"
    }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          swot: {
            type: Type.OBJECT,
            properties: {
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
              opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
              threats: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["strengths", "weaknesses", "opportunities", "threats"],
          },
          riskAssessment: { type: Type.STRING },
          strategicSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          overallScore: { type: Type.NUMBER },
          summary: { type: Type.STRING },
        },
        required: ["swot", "riskAssessment", "strategicSuggestions", "overallScore", "summary"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Failed to get evaluation from AI.");
  }

  return JSON.parse(text) as BusinessEvaluation;
}
