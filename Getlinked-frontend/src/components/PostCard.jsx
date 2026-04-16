import { useState } from "react";
import API from "../api/axios";

function PostCard({ post, fetchFeed }) {
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(post.likes.includes(post.author._id));

  const handleLike = async () => {
    await API.post(`/posts/like/${post._id}`);
    fetchFeed();
  };

  const handleComment = async () => {
    if (!comment.trim()) return;

    await API.post(`/posts/comment/${post._id}`, {
      text: comment,
    });

    setComment("");
    fetchFeed();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 p-3 sm:p-5">
      {/* Author */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs sm:text-sm font-semibold shrink-0">
          {post.author.name.charAt(0)}
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
            {post.author.name}
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-500">Just now</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base wrap-break-word">
        {post.content}
      </p>

      {/* Stats */}
      <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 border-b pb-2">
        <span>❤️ {post.likes.length} Likes</span>
        <span>💬 {post.comments.length} Comments</span>
      </div>

      {/* Actions */}
      <div className="flex justify-around text-xs sm:text-sm mb-2 sm:mb-3">
        <button
          onClick={async () => {
            await handleLike();
            setLiked(!liked);
          }}
          className={`flex items-center gap-1 transition transform duration-200 ${
            liked ? "text-red-500 scale-110" : "text-gray-600"
          }`}
        >
          ❤️ <span className="hidden sm:inline">Like</span>
        </button>

        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition transform hover:scale-105 active:scale-95 duration-150">
          💬 <span className="hidden sm:inline">Comment</span>
        </button>
      </div>

      {/* Comment Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 border rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleComment}
          className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 rounded-full text-blue-600 hover:bg-blue-50 transition whitespace-nowrap"
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default PostCard;
