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
    <div className="max-w-2xl mx-auto mt-6 sm:mt-10 px-3 sm:px-4">
      <h1 className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 font-semibold text-gray-800">
        Search Users
      </h1>

      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search users..."
        className="w-full p-2.5 sm:p-3 border rounded-lg mb-3 sm:mb-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between bg-white p-3 sm:p-4 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            {/* Left: Avatar + Info */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Avatar */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs sm:text-sm font-semibold shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* User Info */}
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                  {user.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Right: Follow Button */}
            {user.isFollowing ? (
              <button
                onClick={() => handleUnfollow(user._id)}
                className="px-2.5 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white transition whitespace-nowrap"
              >
                Following
              </button>
            ) : (
              <button
                onClick={() => handleFollow(user._id)}
                className="px-2.5 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition whitespace-nowrap"
              >
                Follow
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
