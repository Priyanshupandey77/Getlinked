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
    <div className="max-w-2xl mx-auto mt-10">
      <CreatePost fetchFeed={fetchFeed} />

      <h1 className="text-2xl mb-4">Feed</h1>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} fetchFeed={fetchFeed} />
      ))}
    </div>
  );
}

export default Feed;
