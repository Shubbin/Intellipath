import express from "express";
import {
  getUniversities,
  getUniversityById,
  getCourses,
  getCourseById,
} from "../controllers/universityController.js";
import { validateObjectId } from "../middleware/validateObjectId.js";

const router = express.Router();

router.get("/universities", getUniversities);
router.get("/universities/:id", validateObjectId("id"), getUniversityById);
router.get("/courses", getCourses);
router.get("/courses/:id", validateObjectId("id"), getCourseById);

export default router;
