import express from "express";
import { aiChat, careerGuidance } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";
import { rateLimiter } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

// Apply AI rate limiting: max 10 requests per minute
const aiRateLimit = rateLimiter({
  windowMs: 60 * 1000, // 1 minute window
  max: 10,
  message: "Too many requests to the AI advisor. Please wait one minute before asking again.",
});

router.post("/chat", protect, aiRateLimit, aiChat);
router.post("/career-guidance", protect, aiRateLimit, careerGuidance);

export default router;
