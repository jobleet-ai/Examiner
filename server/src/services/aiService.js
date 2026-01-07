import fetch from 'node-fetch';
import dotenv from 'dotenv';
import callGemini from './gemini-service.js';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_API_URL = (process.env.GEMINI_API_URL || '').replace(/\/?$/, '') + '?key=' + GEMINI_API_KEY;

// callGeminiApi: wraps Gemini generative language endpoint with retries and optional responseSchema parsing
export const callGeminiApi = async ({ systemInstruction, userQuery, responseSchema = null }) => {
  return await callGemini(userQuery, systemInstruction);

  const apiKey = GEMINI_API_KEY || '';
  const apiUrl = GEMINI_API_URL;
  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
    tools: [{ "google_search": {} }],
  };

  if (responseSchema) {
    payload.generationConfig = {
      responseMimeType: "application/json",
      responseSchema: responseSchema
    };
  }

  const maxRetries = 1;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Gemini API response:", result);

        const textContent = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (responseSchema) {
          try {
            return JSON.parse(textContent);
          } catch (e) {
            console.error("Failed to parse JSON response:", textContent, e);
            // Allow retry if JSON parsing failed
          }
        } else {
          return textContent || "Error: Could not generate content.";
        }
      } else {
        const data= await response.json()
        const msg = data?.error.message || "Error: Could not connect to the generation service.";
        console.error("Error in generation: ", msg);
        return responseSchema ? { error: msg } : "Error: Could not connect to the generation service.";
      }

      // exponential backoff before retry
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));

    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);
      if (attempt === maxRetries - 1) throw new Error("API call failed after multiple retries.");

      // const delay = Math.pow(2, attempt) * 1000;
      // await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return responseSchema ? { error: "Error: Could not connect to the generation service." } : "Error: Could not connect to the generation service.";
};

export async function generateJobDescription({ title, context, experienceRange, salaryRange }) {
  const systemInstruction = 'You are an assistant that generates concise job descriptions in plain text.';
  const userQuery = `Generate a bullet point job description for:
  Title: ${title}
  Context: ${context}
  ExperienceRange: ${experienceRange}
  SalaryRange: ${salaryRange}
  Output: Provide title, description, responsibilities, requirements, niceToHave, salarySuggestion.`;

  const text = await callGeminiApi({ systemInstruction, userQuery });
  return text;
}

export async function askScreeningQuestions({ skills = [] }) {
  const systemInstruction = 'You are an assistant that creates screening questions.';
  const userQuery = `Create 4 short screening questions (mix of MCQ & short answer) to validate candidate knowledge for these skills: ${skills.join(', ')}. Provide them as numbered list.`;
  const text = await callGeminiApi({ systemInstruction, userQuery });
  return text;
}

export async function generateQuizQuestions(userQuery) {
    try {
        console.log("Generating quiz questions...", userQuery);
        
        const systemInstruction = `You are an expert technical assessment question generator for recruiters. Your task is to generate a set of high-quality, multiple-choice questions (MCQs) to test a candidate's knowledge based on the provided job title and skills.

        The output MUST be a single, valid JSON object that strictly adheres to the requested structure. 

        Rules for generation:
        1.  Generate a total questions as per input, distributed across the the input skills. Aim for a roughly even distribution (e.g., 5 questions per skill).
        2.  Each question object must include the fields: 'skill', 'question', 'options' (an array of 4 options), 'correctAnswer' (a number from 0 to 3 indicating the 0-based index of the correct option), 'difficulty' ('easy', 'medium', or 'hard')).
        3.  The final JSON object must include the 'jobTitle', 'skills', 'timeLimit', and 'totalQuestions' fields from the input.`;

// Simulated API Call
        const aiResponseText = await callGeminiApi({ systemInstruction, userQuery });
        
        // 1. CLEAN THE RAW RESPONSE TEXT
        // Remove leading/trailing backticks and 'json' markers that cause SyntaxError
        let cleanJsonString = aiResponseText.trim();
        
        // Remove the starting triple backticks, optional language marker (like 'json'), and newline
        if (cleanJsonString.startsWith('```')) {
             cleanJsonString = cleanJsonString
                                 .replace(/^```json\n/, '') // Target '```json\n'
                                 .replace(/^```\n/, '');    // Target '```\n'
        }

        // Remove the trailing triple backticks
        if (cleanJsonString.endsWith('```')) {
            cleanJsonString = cleanJsonString.replace(/\n```$/, '');
        }

        // 2. PARSE THE CLEANED JSON STRING
        // The AI's output sometimes contains line breaks and trailing spaces 
        // within the JSON, we need to ensure the whole string is usable.
        const quizData = JSON.parse(cleanJsonString);
        
        console.log("Quiz questions successfully generated and parsed.", quizData);
        
        return quizData;

    } catch (error) {
        console.error("Error generating quiz questions:", error);
        return null;
    }
  }
