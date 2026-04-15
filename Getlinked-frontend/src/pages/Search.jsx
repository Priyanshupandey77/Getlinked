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

  //   const handleFollow = async (id) => {
  //     try {
  //       await API.post(`/users/follow/${id}`);
  //       setUsers(users.filter((u) => u._id !== id));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

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
          className="border p-3 mb-2 rounded flex justify-between"
        >
          <div>
            <h3 className="font-bold">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          {user.isFollowing ? (
            <button
              onClick={() => handleUnfollow(user._id)}
              className="bg-gray-500 text-white px-3 py-1"
            >
              Following
            </button>
          ) : (
            <button
              onClick={() => handleFollow(user._id)}
              className="bg-blue-500 text-white px-3 py-1"
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
