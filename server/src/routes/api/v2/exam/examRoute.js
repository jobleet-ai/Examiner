import express from 'express';
import aiExamService from '../../../../services/aiExamService.js';
import { authenticateToken } from '../../../../middleware/auth.js';
import { restrictAiUsage } from '../../../../middleware/accessGuard.js';


const router = express.Router();

router.post('/generate', authenticateToken, restrictAiUsage, async (req, res) => {
  try {
    console.log('generate api hit')
    const { config } = req.body;

    // Basic validation
    if (!config || !config.subject || !config.grade) {
      return res.status(400).json({ error: 'Missing required configuration fields.' });
    }

    const questions = await aiExamService.generateQuestions(config);
    res.json(questions);
  } catch (error) {
    console.error('Route Error [Generate]:', error);
    res.status(500).json({ error: 'Internal Server Error while generating questions.' });
  }
});

/**
 * @route   POST /api/exam/evaluate
 * @desc    Evaluate student answers and return a performance report
 */
router.post('/evaluate', authenticateToken, async (req, res) => {
  try {
    const { questions, answers, config } = req.body;

    // Basic validation
    if (!questions || !answers || !config) {
      return res.status(400).json({ error: 'Missing data for evaluation.' });
    }

    const report = await aiExamService.evaluateAnswers(questions, answers, config);
    res.json(report);
  } catch (error) {
    console.error('Route Error [Evaluate]:', error);
    res.status(500).json({ error: 'Internal Server Error while evaluating answers.' });
  }
});


export default router;