import { useEffect, useState } from "react";
import API from "../api/axios";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const res = await API.get("/posts/feed");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 py-10">
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

        <div className="space-y-5">
          {loading ? (
            // ⏳ Skeleton Loader
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-2xl shadow animate-pulse"
                >
                  <div className="h-4 bg-gray-300 w-1/3 mb-2 rounded"></div>
                  <div className="h-3 bg-gray-200 w-full mb-1 rounded"></div>
                  <div className="h-3 bg-gray-200 w-5/6 rounded"></div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            // ✅ Real posts
            posts.map((post) => (
              <PostCard key={post._id} post={post} fetchFeed={fetchFeed} />
            ))
          ) : (
            // 💤 Empty state
            <div className="text-center text-gray-500 py-10 bg-white rounded-2xl shadow">
              No posts yet 🚀 <br />
              <span className="text-sm">Be the first to share something!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Feed;
