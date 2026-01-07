// middleware/accessGuard.js
import User from '../models/User.js';

export const restrictAiUsage = async (req, res, next) => {
    const user = await User.findById(req.user.userId);
    console.log("User restrictAiUsage:", user );
    // Reset daily count if it's a new day
    const today = new Date().toDateString();
    if (user.lastAiReset !== today) {
        user.aiCreditsUsed = 0;
        user.lastAiReset = today;
    }

    const MAX_DAILY_AI_HITS = 50; // Tier-based limit

    if (user.aiCreditsUsed >= MAX_DAILY_AI_HITS) {
        console.log("Daily AI limit reached");
        return res.status(429).json({ 
            success: false, 
            message: "Daily AI limit reached. Upgrade to Pro for unlimited access." 
        });
    }

    user.aiCreditsUsed += 1;
    console.log("AI credits used:", user);
    await user.save();
    next();
};