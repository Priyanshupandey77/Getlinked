import { useEffect, useState } from "react";
import API from "../api/axios";

function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchedFeed = async () => {
    try {
      const res = await API.get("/posts/feed");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchedFeed();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl mb-4">Feed</h1>

      {posts.map((post) => (
        <div key={post._id} className="border p-4 mb-4 rounded">
          <h3 className="font-bold">{post.author.name}</h3>
          <p>{post.content}</p>

          <div className="text-sm text-gray-500 mt-2">
            ❤️ {post.likes.length} Likes | 💬 {post.comments.length} Comments
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;
