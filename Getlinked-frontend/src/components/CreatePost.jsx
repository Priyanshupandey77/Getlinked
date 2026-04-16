import { useState } from "react";
import API from "../api/axios";

function CreatePost({ fetchFeed }) {
  const [content, setContent] = useState("");

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      await API.post("/posts", { content });
      setContent("");
      fetchFeed();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleCreatePost} className="mb-4 sm:mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2.5 sm:p-3 border rounded-lg text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={3}
      />

      <button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 sm:py-2 mt-2 rounded-lg text-sm sm:text-base font-medium transition">
        Post
      </button>
    </form>
  );
}

export default CreatePost;
