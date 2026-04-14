import Notification from "../models/Notification.js"

export const createNotification = async ({
  recipient,
  sender,
  type,
  post = null,
}) => {
  try {
    if (!recipient || !sender) return;

    if (recipient.toString() === sender.toString()) return;

    await Notification.create({
      recipient,
      sender,
      type,
      post,
    });
  } catch (err) {
    console.error("Notification error:", err.message);
  }
};