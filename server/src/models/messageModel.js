import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: [true, "Message must be linked to an application"],
      index: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Message must have a sender"],
      index: true,
    },
    senderRole: {
      type: String,
      enum: ["student", "admin", "schoolAdmin"],
      required: [true, "Message must specify a sender role"],
    },
    message: {
      type: String,
      required: [true, "Message content cannot be empty"],
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// High-performance compound index for date-sorted query streams per application
messageSchema.index({ applicationId: 1, createdAt: 1 });

export const Message = mongoose.model("Message", messageSchema);
export default Message;
