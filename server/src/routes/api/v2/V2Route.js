import express from "express";
console.log("api V2 Routes");
const router = express.Router();
// Import Routes
import authRoutes from'./auth/AuthRoute.js';


import feedbackRoutes from './feedback/feedbackRoutes.js';

import signedRoutes from './signedurl/SignedUrlRoute.js';
import examRoutes from './exam/examRoute.js';


router.use('/auth', authRoutes);


router.use('/feedback', feedbackRoutes);

router.use('/exam', examRoutes);

export default router;
