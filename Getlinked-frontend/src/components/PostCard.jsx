import { useState } from "react";
import API from "../api/axios";

function PostCard({ post, fetchFeed }) {
  const [comment, setComment] = useState("");

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
    <div className="bg-white shadow-sm border rounded p-4 mb-4">
      <h3 className="font-bold">{post.author.name}</h3>
      <p>{post.content}</p>

      <div className="text-sm text-gray-500 mt-2">
        ❤️ {post.likes.length} Likes | 💬 {post.comments.length} Comments
      </div>
      <button
        onClick={handleLike}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
      >
        ❤️ Like
      </button>
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button onClick={handleComment} className="text-green-500 mt-1">
        Comment
      </button>
    </div>
  );
}

export default PostCard;
