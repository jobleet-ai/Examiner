
import callGemini from "./gemini-service.js";

const aiExamService = {
  async generateQuestions(config) {
    const systemInstruction = `You are an expert exam generator. 
Return ONLY valid JSON. Do not include markdown formatting, backticks, or any introductory text.
The JSON must follow this exact structure:
{
  "mcq": [
    {
      "id": "mcq_1",
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": 0,
      "topic": "string"
    }
  ],
  "subjective": [
    {
      "id": "subj_1",
      "question": "string",
      "topic": "string",
      "expectedPoints": ["string"]
    }
  ]
}`;

    const userPrompt = `Generate a ${config.board} curriculum exam for ${config.grade} in ${config.subject}.
Requirements:
- MCQ Count: ${config.mcqCount}
- Subjective Count: ${config.subjectiveCount}
- Difficulty: Appropriate for ${config.grade} level.`;

    try {
      // Invoke your existing callGemini function
      const aiResponseText = await callGemini(userPrompt, systemInstruction);

      // Clean the response just in case Gemini adds markdown block wrappers
      const cleaned = aiResponseText.replace(/```json\n?|\n?```/g, '').trim();
      
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Node.js Service - Generation error:', error);
      throw new Error('Failed to generate questions via Gemini Service');
    }
  },

  async evaluateAnswers(questions, answers, config) {
    const systemInstruction = `You are an academic evaluator. Analyze the provided exam questions and student answers. 
Return ONLY a valid JSON object containing totalScore, maxScore, percentage, mcqScore, subjectiveScore, grade, strengths, weaknesses, topicAnalysis, and detailedFeedback. 
Do not use markdown backticks.`;

    const userPrompt = `Config: Grade ${config.grade}, ${config.subject}, ${config.board}
Questions and Answers: ${JSON.stringify({ questions, answers })}`;

    try {
      const aiResponseText = await callGemini(userPrompt, systemInstruction);
      const cleaned = aiResponseText.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Node.js Service - Evaluation error:', error);
      throw new Error('Failed to evaluate answers via Gemini Service');
    }
  }
};

export default aiExamService;