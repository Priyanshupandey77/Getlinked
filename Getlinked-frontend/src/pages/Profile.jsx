import { useEffect, useState } from "react";
import API from "../api/axios";

function Profile() {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/me");
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-5">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>

            {/* Stats */}
            <div className="flex gap-6 mt-3 text-sm">
              <span className="text-gray-700">
                <strong>{user.followers.length}</strong> Followers
              </span>
              <span className="text-gray-700">
                <strong>{user.following.length}</strong> Following
              </span>
            </div>
          </div>
        </div>

        {/* Followers Section */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Followers
          </h3>

          {user.followers.length === 0 ? (
            <p className="text-gray-500 text-sm">No followers yet</p>
          ) : (
            <div className="space-y-3">
              {user.followers.map((f) => (
                <div
                  key={f._id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">{f.name}</p>
                    <p className="text-sm text-gray-500">{f.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Following Section */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Following
          </h3>

          {user.following.length === 0 ? (
            <p className="text-gray-500 text-sm">Not following anyone</p>
          ) : (
            <div className="space-y-3">
              {user.following.map((f) => (
                <div
                  key={f._id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">{f.name}</p>
                    <p className="text-sm text-gray-500">{f.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
