import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { Prediction } from '../types';

// Assumes API_KEY is set in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const predictionSchema = {
  type: Type.OBJECT,
  properties: {
    homeWinProbability: { 
      type: Type.NUMBER,
      description: "Probability of the home team winning, from 0.0 to 1.0"
    },
    drawProbability: { 
      type: Type.NUMBER,
      description: "Probability of a draw, from 0.0 to 1.0"
    },
    awayWinProbability: { 
      type: Type.NUMBER,
      description: "Probability of the away team winning, from 0.0 to 1.0"
    },
    rationale: { 
      type: Type.STRING,
      description: "A brief, one-sentence explanation for the prediction, mentioning key factors."
    },
    h2h: {
      type: Type.OBJECT,
      description: "A plausible head-to-head record based on the teams' history.",
      properties: {
        homeWins: { type: Type.NUMBER, description: "Number of wins for the home team in past encounters." },
        draws: { type: Type.NUMBER, description: "Number of draws in past encounters." },
        awayWins: { type: Type.NUMBER, description: "Number of wins for the away team in past encounters." }
      },
      required: ['homeWins', 'draws', 'awayWins']
    }
  },
  required: ['homeWinProbability', 'drawProbability', 'awayWinProbability', 'rationale', 'h2h'],
};


export const getPrediction = async (homeTeam: string, awayTeam: string, competition: string): Promise<Prediction> => {
  const prompt = `
    Act as an expert football analyst. Your task is to predict the outcome probabilities for an upcoming football match.
    Provide your prediction based on general football knowledge, including typical team strength, league dynamics, and common performance factors.
    Also, provide a plausible head-to-head (H2H) record based on the teams' historical encounters. This H2H record should be a realistic representation, not necessarily exact real-time data.

    Match Details:
    - Home Team: ${homeTeam}
    - Away Team: ${awayTeam}
    - Competition: ${competition}

    Analyze the matchup and provide your prediction, including the H2H record. The sum of the three probabilities must be exactly 1.0.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: predictionSchema,
      }
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      throw new Error("Received an empty response from the AI model.");
    }
    
    const predictionData = JSON.parse(jsonText);

    // Basic validation
    const { homeWinProbability, drawProbability, awayWinProbability } = predictionData;
    const total = homeWinProbability + drawProbability + awayWinProbability;

    // Allow for minor floating point inaccuracies
    if (Math.abs(total - 1.0) > 0.01) {
        console.warn(`Probabilities sum to ${total}, not 1.0. Normalizing.`);
        predictionData.homeWinProbability /= total;
        predictionData.drawProbability /= total;
        predictionData.awayWinProbability /= total;
    }
    
    return predictionData as Prediction;

  } catch (error) {
    console.error("Error fetching prediction from Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get prediction: ${error.message}`);
    }
    throw new Error('An unknown error occurred while communicating with the AI model.');
  }
};