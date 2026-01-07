import API_BASE from "@/config/API_BASE";
import { getItem } from "@/tokenUtils";
import { demoData } from './components/examDemoData';


const GeminiService = {
  /**
   * Calls Node.js API to generate questions
   */
  async generateQuestions(config, demo=false) {
    if (demo) return demoData.questions;

    try {
      const response = await fetch(`${API_BASE.EXAM_API}/generate`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", Authorization: `Bearer ${getItem('token')}`
        },
        body: JSON.stringify({ config })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate questions');
      }

      return await response.json();
    } catch (error) {
      console.error('Frontend API Error [generateQuestions]:', error);
      throw error;
    }
  },

  /**
   * Calls Node.js API to evaluate answers
   */
  async evaluateAnswers(questions, answers, config, demo=false) {
    if (demo) return demoData.evaluationData;

    try {
      const response = await fetch(`${API_BASE.EXAM_API}/evaluate`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", Authorization: `Bearer ${getItem('token')}`
        },
        body: JSON.stringify({ questions, answers, config })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to evaluate answers');
      }

      return await response.json();
    } catch (error) {
      console.error('Frontend API Error [evaluateAnswers]:', error);
      throw error;
    }
  }
};

export default GeminiService;