import rateLimit from 'express-rate-limit';

export const publicSearchLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 search requests per window
  message: {
    success: false,
    message: "Too many search requests. Please try again later."
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,
});

