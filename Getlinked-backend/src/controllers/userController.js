import User from "../models/User.js";

export const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("followers", "name email")
    .populate("following", "name email");

  res.json(user);
};
