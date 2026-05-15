import express from "express";
import { aiChat, careerGuidance } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/chat", protect, aiChat);
router.post("/career-guidance", protect, careerGuidance);

export default router;
