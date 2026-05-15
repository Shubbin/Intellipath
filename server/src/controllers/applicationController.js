import { Scholarship, Application } from "../models/scholarshipModel.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get all scholarships
// @route   GET /api/scholarships
// @access  Public
export const getScholarships = asyncHandler(async (req, res) => {
  const scholarships = await Scholarship.find({});
  res.json({
    success: true,
    message: "Scholarships fetched successfully",
    data: scholarships,
  });
});

// @desc    Apply for a course
// @route   POST /api/applications/apply
// @access  Private
export const applyForCourse = asyncHandler(async (req, res) => {
  const { universityId, courseId, matchScore } = req.body;

  const application = await Application.create({
    studentId: req.user._id,
    universityId,
    courseId,
    matchScore,
  });

  res.status(201).json({
    success: true,
    message: "Application submitted successfully",
    data: application,
  });
});

// @desc    Get user applications
// @route   GET /api/applications
// @access  Private
export const getUserApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ studentId: req.user._id })
    .populate("universityId", "name location logo")
    .populate("courseId", "courseName");

  res.json({
    success: true,
    message: "Applications fetched successfully",
    data: applications,
  });
});
