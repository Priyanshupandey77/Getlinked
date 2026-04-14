import express from "express";
import {
  followUser,
  getMyProfile,
  searchUsers,
  unfollowUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.post("/follow/:id", protect, followUser);
router.post("/unfollow/:id", protect, unfollowUser);
router.get("/search", protect, searchUsers);

export default router;
