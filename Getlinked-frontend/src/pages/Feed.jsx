import { useEffect, useState } from "react";
import API from "../api/axios";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchFeed = async () => {
    try {
      const res = await API.get("/posts/feed");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10">
      <div className="max-w-2xl mx-auto px-4 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Your Feed</h1>
          <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow">
            {posts.length} posts
          </span>
        </div>

        {/* Create Post */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <CreatePost fetchFeed={fetchFeed} />
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post._id} post={post} fetchFeed={fetchFeed} />
            ))
          ) : (
            <div className="text-center text-gray-500 py-12 bg-white rounded-2xl shadow">
              <p className="text-lg">No posts yet 🚀</p>
              <p className="text-sm mt-1">Be the first to share something!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Feed;