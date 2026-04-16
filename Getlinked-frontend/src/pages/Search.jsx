import { useState } from "react";
import API from "../api/axios";

function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setUsers([]);
      return;
    }

    try {
      const res = await API.get(`/users/search?q=${value}`);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (id) => {
    try {
      await API.post(`/users/follow/${id}`);

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isFollowing: true } : u)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (id) => {
    try {
      await API.post(`/users/Unfollow/${id}`);

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isFollowing: false } : u)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl mb-4">Search Users</h1>

      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search users..."
        className="w-full p-2 border mb-4"
      />

      {users.map((user) => (
        <div
          key={user._id}
          className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition"
        >
          {/* Left: Avatar + Info */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            {/* User Info */}
            <div>
              <h3 className="font-semibold text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Right: Follow Button */}
          {user.isFollowing ? (
            <button
              onClick={() => handleUnfollow(user._id)}
              className="px-4 py-1.5 text-sm font-medium rounded-lg bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white transition"
            >
              Following
            </button>
          ) : (
            <button
              onClick={() => handleFollow(user._id)}
              className="px-4 py-1.5 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Follow
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Search;
