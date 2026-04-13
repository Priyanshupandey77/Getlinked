import express from "express";
import {
  commentOnPost,
  createPost,
  deletePost,
  getFeed,
  likePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/feed", protect, getFeed);
router.post("/like/:id", protect, likePost);
router.post("/comment/:id", protect, commentOnPost);
router.delete("/:id", protect, deletePost);

export default router;
