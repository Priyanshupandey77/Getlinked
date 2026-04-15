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
    <div className="border p-4 mb-4 rounded">
      <h3 className="font-bold">{post.author.name}</h3>
      <p>{post.content}</p>

      <div className="text-sm text-gray-500 mt-2">
        ❤️ {post.likes.length} Likes | 💬 {post.comments.length} Comments
      </div>
      <button onClick={handleLike} className="text-blue-500 mr-4">
        ❤️ Like
      </button>
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border p-1 mt-2 w-full"
      />

      <button onClick={handleComment} className="text-green-500 mt-1">
        Comment
      </button>
    </div>
  );
}

export default PostCard;
