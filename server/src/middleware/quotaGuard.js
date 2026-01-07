// middleware/quotaGuard.js
import { stat } from 'fs';
import User from '../models/User.js';

export const checkJobPostingQuota = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        const today = new Date().toDateString();
        const { status } = req.body;
        if(status === "draft"){
            return next();
        }
 
        // 1. Reset count if it's a new day
        if (user.lastJobPostDate !== today) {
            user.dailyJobCount = 0;
            user.lastJobPostDate = today;
            await user.save();
        }

        // 2. Define Limits based on tier
        const LIMITS = {
            free: 25,  // 3 jobs per day
            pro: 20   // 20 jobs per day
        };

        const currentLimit = LIMITS[user.subscriptionTier] || 3;

        // 3. Check if quota exceeded
        if (user.dailyJobCount >= currentLimit) {
            return res.status(429).json({
                success: false,
                message: `Daily limit reached. You can only post ${currentLimit} jobs per day on the ${user.subscriptionTier} plan.`,
                upgradeRequired: user.subscriptionTier === 'free'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Quota check failed" });
    }
};