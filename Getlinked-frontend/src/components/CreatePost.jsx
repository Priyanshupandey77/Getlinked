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
    <form onSubmit={handleCreatePost} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border rounded"
      />
      <button className="bg-blue-500 text-white px-4 py-2 mt-2">Post</button>
    </form>
  );
}

export default CreatePost;
