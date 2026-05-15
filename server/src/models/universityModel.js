import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a university name"],
      unique: true,
    },
    location: String,
    ranking: Number,
    description: String,
    logo: String,
  },
  {
    timestamps: true,
  }
);

export const University = mongoose.model("University", universitySchema);

const courseSchema = new mongoose.Schema(
  {
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
    courseName: {
      type: String,
      required: [true, "Please add a course name"],
    },
    cutoffMark: Number,
    slotsAvailable: Number,
    requiredSubjects: [String],
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", courseSchema);
