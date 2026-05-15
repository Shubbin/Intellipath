import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a scholarship title"],
    },
    eligibility: String,
    deadline: Date,
    coverage: String,
    category: String,
  },
  {
    timestamps: true,
  }
);

export const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

const applicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },
    matchScore: Number,
  },
  {
    timestamps: true,
  }
);

export const Application = mongoose.model("Application", applicationSchema);
