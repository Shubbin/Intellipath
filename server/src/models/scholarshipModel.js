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
