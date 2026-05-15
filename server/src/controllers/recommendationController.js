import { generateRecommendations } from "../services/recommendationService.js";
import Recommendation from "../models/recommendationModel.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get recommendations for the logged-in user
// @route   GET /api/recommendations
// @access  Private
export const getRecommendations = asyncHandler(async (req, res) => {
  const recommendations = await generateRecommendations(req.user);

  // Save or update in DB
  await Recommendation.findOneAndUpdate(
    { userId: req.user._id },
    {
      recommendedCourses: recommendations.map((r) => ({
        courseId: r.course._id,
        matchPercentage: r.matchPercentage,
        explanation: r.explanation,
      })),
      matchPercentage: recommendations.length > 0 ? recommendations[0].matchPercentage : 0,
    },
    { upsert: true, new: true }
  );

  res.json({
    success: true,
    message: "Recommendations generated successfully",
    data: recommendations,
  });
});
