import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({
    recipient: req.user._id,
  })
    .populate("sender", "name")
    .populate("post", "content")
    .sort({ createdAt: -1 });

  res.json(notifications);
};
