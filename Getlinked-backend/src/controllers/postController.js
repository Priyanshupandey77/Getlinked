import Post from "../models/Post.js";
import User from "../models/User.js";
import { createNotification } from "../utils/createNotification.js";

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

  const page = parseInt(req.query.page) || 1;
  const limit = 5;

  const posts = await Post.find({
    author: {
      $in: [...user.following, req.user._id],
    },
  })
    .populate("author", "name email")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(posts);
};

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }

  const alreadyLiked = post.likes.some(
    (id) => id.toString() === req.user._id.toString(),
  );

  if (alreadyLiked) {
    //unlike
    post.likes = post.likes.filter(
      (id) => id.toString() !== req.user._id.toString(),
    );
  } else {
    //like
    post.likes.push(req.user._id);
  }
  await post.save();
  await createNotification({
    recipient: post.author,
    sender: req.user._id,
    type: "like",
    post: post._id,
  });

  res.json({ msg: alreadyLiked ? "Post unliked" : "Post liked" });
};

export const commentOnPost = async (req, res) => {
  const { text } = req.body;

  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }

  post.comments.push({
    user: req.user._id,
    text,
  });
  await post.save();
  await createNotification({
    recipient: post.author,
    sender: req.user._id,
    type: "comment",
    post: post._id,
    commentText: text,
  });

  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ msg: "Post not found" });

  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  await post.deleteOne();

  res.json({ msg: "Post deleted" });
};
