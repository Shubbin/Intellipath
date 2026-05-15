import express from "express";
import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        success: true,
        message: "Profile fetched",
        data: user,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// @desc    Update user profile
// @route   PUT /api/users/update-profile
// @access  Private
router.put(
  "/update-profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.fullName = req.body.fullName || user.fullName;
      user.jambScore = req.body.jambScore || user.jambScore;
      user.interests = req.body.interests || user.interests;
      user.preferredLocation = req.body.preferredLocation || user.preferredLocation;

      const updatedUser = await user.save();

      res.json({
        success: true,
        message: "Profile updated",
        data: updatedUser,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

export default router;
