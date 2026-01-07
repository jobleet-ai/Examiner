// import express from 'express';
// import callGemini from './gemini-service.js';
// import { cache } from 'react';

// const app = express();

// app.use(express.json());
// const resumeText="java, react.js";
//   const prompt = `You are an expert HR assistant for Jobleet.com. 
//                   Summarize the following resume into 3 bullet points 
//                   highlighting key skills: ${resumeText}`;
// // Example Route: Resume Summarizer for Jobleet
// app.post('/api/ai/summarize-resume', async (req, res) => {
//   const { resumeText } = req.body;
  
//   if (!resumeText) {
//     return res.status(400).json({ error: 'Resume text is required' });
//   }

// //   const prompt = `You are an expert HR assistant for Jobleet.com. 
// //                   Summarize the following resume into 3 bullet points 
// //                   highlighting key skills: ${resumeText}`;

//   try {
//     const summary = await callGemini(prompt);
//     res.json({ success: true, summary });
//   } catch (err) {
//     res.status(500).json({ error: 'AI processing failed' });
//   }
// });
// try {
//     const summary = await callGemini(prompt);
//     console.log('res: ', summary);
// } catch (error) {
//   // Use optional chaining (?.) and a fallback message
//   const errorMessage = error?.message || error?.statusText || "An unknown AI error occurred";
//   console.error("Gemini API Error:", errorMessage);
  
//   // Log the full error to your console to see what's actually inside it
//   console.dir(error, { depth: null }); 
  

// }



//app.listen(3000, () => console.log('Jobleet Backend running on port 3000'));