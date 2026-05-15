import { Course } from "../models/universityModel.js";

/**
 * Calculate match score for a student and a course.
 * @param {Object} student - Student profile data
 * @param {Object} course - Course data
 * @returns {Number} - Match score percentage (0-100)
 */
export const calculateMatchScore = (student, course) => {
  let score = 0;
  let weights = {
    jamb: 40,
    subjects: 30,
    interests: 30,
  };

  // 1. JAMB Score (40%)
  // Assume cutoff is the minimum required
  if (student.jambScore >= course.cutoffMark) {
    score += weights.jamb;
  } else if (student.jambScore >= course.cutoffMark - 20) {
    score += weights.jamb * 0.7; // Close match
  }

  // 2. Subjects (30%)
  if (student.subjects && course.requiredSubjects) {
    const studentSubjectNames = student.subjects.map((s) => s.name.toLowerCase());
    const matchedSubjects = course.requiredSubjects.filter((s) =>
      studentSubjectNames.includes(s.toLowerCase())
    );
    const subjectMatchRatio = matchedSubjects.length / course.requiredSubjects.length;
    score += subjectMatchRatio * weights.subjects;
  }

  // 3. Interests (30%)
  if (student.interests && course.courseName) {
    const courseNameWords = course.courseName.toLowerCase().split(" ");
    const matchedInterests = student.interests.filter((interest) =>
      courseNameWords.some((word) => word.includes(interest.toLowerCase()) || interest.toLowerCase().includes(word))
    );
    if (matchedInterests.length > 0) {
      score += weights.interests;
    }
  }

  return Math.min(Math.round(score), 100);
};

export const generateRecommendations = async (user) => {
  const courses = await Course.find({}).populate("universityId");

  const recommendations = courses
    .map((course) => {
      const matchPercentage = calculateMatchScore(user, course);
      return {
        course,
        matchPercentage,
        explanation: `You have a ${matchPercentage}% match for ${course.courseName} at ${course.universityId.name} because your JAMB score and interests align with their requirements.`,
      };
    })
    .filter((rec) => rec.matchPercentage >= 50) // Only show 50%+ matches
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  return recommendations.slice(0, 5); // Return top 5
};
