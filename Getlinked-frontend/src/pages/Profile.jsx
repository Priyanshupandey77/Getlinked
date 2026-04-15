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
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl mb-4">Profile</h1>

      <div className="border p-4 rounded mb-4">
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p>{user.email}</p>

        <div className="mt-3">
          <span className="mr-4">👥 Followers: {user.followers.length}</span>
          <span>➡️ Following: {user.following.length}</span>
        </div>
      </div>

      <h3 className="text-lg mb-2">Followers</h3>
      {user.followers.map((f) => (
        <div key={f._id} className="border p-2 mb-2 rounded">
          {f.name} ({f.email})
        </div>
      ))}

      <h3 className="text-lg mt-4 mb-2">Following</h3>
      {user.following.map((f) => (
        <div key={f._id} className="border p-2 mb-2 rounded">
          {f.name} ({f.email})
        </div>
      ))}
    </div>
  );
}


export default Profile;