import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["follow", "like", "comment"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    commentText: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Notification", notificationSchema);
