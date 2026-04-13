import User from "../models/User.js";

export const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("followers", "name email")
    .populate("following", "name email");

  res.json(user);
};

export const followUser = async (req, res) => {
  const userToFollow = await User.findById(req.params.id);
  const currentUser = await User.findById(req.user._id);

  if (!userToFollow) {
    return res.status(404).json({ msg: "User not found" });
  }

  if (userToFollow._id.equals(currentUser._id)) {
    return res.status(400).json({ msg: "you cannot follow yourself" });
  }
  if (currentUser.following.some((id) => id.equals(userToFollow._id))) {
    return res.status(400).json({ msg: "Already following" });
  }

  currentUser.following.push(userToFollow._id);
  userToFollow.followers.push(currentUser._id);

  await currentUser.save();
  await userToFollow.save();

  res.json({ msg: "User followed" });
};

export const unfollowUser = async (req, res) => {
  const userToUnfollow = await User.findById(req.params.id);
  const currentUser = await User.findById(req.user._id);

  if (!userToUnfollow) {
    return res.status(404).json({ msg: "User not found" });
  }
  if (!currentUser.following.some((id) => id.equals(userToUnfollow._id))) {
    return res.status(400).json({ msg: "Not following this user" });
  }

  currentUser.following = currentUser.following.filter(
    (id) => id.toString() !== userToUnfollow._id.toString(),
  );

  userToUnfollow.followers = userToUnfollow.followers.filter(
    (id) => id.toString() !== currentUser._id.toString(),
  );

  await currentUser.save();
  await userToUnfollow.save();

  res.json({ msg: "User unfollowed" });
};
