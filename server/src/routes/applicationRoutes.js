import express from "express";
import {
  getScholarships,
  applyForCourse,
  getUserApplications,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/scholarships", getScholarships);
router.get("/applications", protect, getUserApplications);
router.post("/applications/apply", protect, applyForCourse);

export default router;
