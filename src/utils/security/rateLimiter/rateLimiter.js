import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 10, 
  message: {
    status: 429,
    message: "Too many login attempts, please try again after 5 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});