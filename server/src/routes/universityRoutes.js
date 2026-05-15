import express from "express";
import {
  getUniversities,
  getUniversityById,
  getCourses,
  getCourseById,
} from "../controllers/universityController.js";

const router = express.Router();

router.get("/universities", getUniversities);
router.get("/universities/:id", getUniversityById);
router.get("/courses", getCourses);
router.get("/courses/:id", getCourseById);

export default router;
