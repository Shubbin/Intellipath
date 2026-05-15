import { University, Course } from "../models/universityModel.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get all universities
// @route   GET /api/universities
// @access  Public
export const getUniversities = asyncHandler(async (req, res) => {
  const universities = await University.find({});
  res.json({
    success: true,
    message: "Universities fetched successfully",
    data: universities,
  });
});

// @desc    Get university by ID
// @route   GET /api/universities/:id
// @access  Public
export const getUniversityById = asyncHandler(async (req, res) => {
  const university = await University.findById(req.params.id);

  if (university) {
    res.json({
      success: true,
      message: "University fetched successfully",
      data: university,
    });
  } else {
    res.status(404);
    throw new Error("University not found");
  }
});

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}).populate("universityId", "name");
  res.json({
    success: true,
    message: "Courses fetched successfully",
    data: courses,
  });
});

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate("universityId", "name");

  if (course) {
    res.json({
      success: true,
      message: "Course fetched successfully",
      data: course,
    });
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});
