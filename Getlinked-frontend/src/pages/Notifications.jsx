import { useEffect, useState } from "react";
import API from "../api/axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const formatTime = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl mb-4">Notifications 🔔</h1>

      {notifications.length === 0 && (
        <p className="text-gray-500">No notifications yet</p>
      )}

      {notifications.map((n) => (
        <div
          key={n._id}
          className={`p-3 mb-2 border rounded ${
            !n.isRead ? "bg-gray-100" : ""
          }`}
        >
          <p>
            <span className="font-bold">{n.sender.name}</span>{" "}
            {n.type === "follow" && "followed you"}
            {n.type === "like" && "liked your post"}
            {n.type === "comment" && (
              <>
                commented:{" "}
                <span className="italic">
                  "{n.commentText || "Nice post!"}"
                </span>
              </>
            )}
          </p>

          {n.post && (
            <p className="text-sm text-gray-500 mt-1">"{n.post.content}"</p>
          )}

          <p className="text-xs text-gray-400 mt-2">
            {new Date() - new Date(n.createdAt) < 86400000
              ? formatTime(n.createdAt)
              : new Date(n.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Notifications;
