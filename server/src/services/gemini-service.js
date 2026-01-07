import { VertexAI, HarmCategory, HarmBlockThreshold } from '@google-cloud/vertexai';

// 1. Core Config (Keep us-central1 for best model availability)
const project = 'helpful-chiller-482303-c8';
const location = 'us-central1';
const modelName = 'gemini-2.0-flash-001';

// 2. Initialize Vertex AI
const vertexAI = new VertexAI({ project, location });

// 3. Reusable Model Instance
const generativeModel = vertexAI.getGenerativeModel({
  model: modelName,
  // Safety settings prevent blocked responses for common career-related terms
  safetySettings: [
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE }
  ],
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 0.7, // 0.0 for factual resume parsing, 0.7 for creative summaries
    topP: 0.95,
  }
});

/**
 * Main function for Jobleet tasks
 * @param {string} userPrompt - The text to process
 * @param {string} systemInstruction - Optional context (e.g., "You are a recruiter")
 */
async function callGemini(userPrompt, systemInstruction = '') {
  try {
    const request = {
      contents: [
        {
          role: 'user', // Explicitly set role to avoid 400 errors
          parts: [{ text: systemInstruction ? `${systemInstruction}\n\n${userPrompt}` : userPrompt }]
        }
      ],
    };

    const result = await generativeModel.generateContent(request);
    
    // Safety check for candidates
    if (!result.response.candidates?.[0]) {
      throw new Error('AI blocked the response due to safety filters.');
    }

    return result.response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Jobleet AI Service Error:', error.message);
    throw error;
  }
}

export default callGemini;