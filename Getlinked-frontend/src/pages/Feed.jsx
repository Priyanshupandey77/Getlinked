import { useEffect, useState } from "react";
import API from "../api/axios";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState({});

  const fetchFeed = async () => {
    try {
      const res = await API.get("/posts/feed");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
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

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form onSubmit={handleCreatePost} className="mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-2 border rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 mt-2">Post</button>
      </form>
      <h1 className="text-2xl mb-4">Feed</h1>

      {posts.map((post) => (
        <div key={post._id} className="border p-4 mb-4 rounded">
          <h3 className="font-bold">{post.author.name}</h3>
          <p>{post.content}</p>

          <div className="text-sm text-gray-500 mt-2">
            ❤️ {post.likes.length} Likes | 💬 {post.comments.length} Comments
          </div>
          <button
            onClick={async () => {
              try {
                await API.post(`/posts/like/${post._id}`);
                fetchFeed();
              } catch (error) {
                console.log(error);
              }
            }}
            className="text-blue-500 mr-4"
          >
            ❤️ Like
          </button>
          <input
            type="text"
            placeholder="Write a comment..."
            value={comments[post._id] || ""}
            onChange={(e) =>
              setComments({
                ...comments,
                [post._id]: e.target.value,
              })
            }
            className="border p-1 mt-2 w-full"
          />

          <button
            onClick={async () => {
              try {
                if (!comments[post._id]?.trim()) return;

                await API.post(`/posts/comment/${post._id}`, {
                  text: comments[post._id],
                });

                setComments({
                  ...comments,
                  [post._id]: "",
                });

                fetchFeed();
              } catch (error) {
                console.log(error.response?.data);
                alert("Failed to add comment");
              }
            }}
            className="text-green-500 mt-1"
          >
            Comment
          </button>
        </div>
      ))}
    </div>
  );
}

export default Feed;
