import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  const { content } = req.body;

  const post = await Post.create({
    author: req.user._id,
    content,
  });

  res.json(post);
};

export const getFeed = async (req, res) => {
  const user = await User.findById(req.user._id);

  const posts = await Post.find({
    author: {
      $in: [...user.following, req.user._id],
    },
  })
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  res.json(posts);
};
