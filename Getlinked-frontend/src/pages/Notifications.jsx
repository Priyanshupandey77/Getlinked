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
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Notifications 🔔</h1>
          <span className="text-sm text-gray-500">
            {notifications.length} total
          </span>
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center bg-white p-8 rounded-2xl shadow text-gray-500">
            No notifications yet 🚀
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`flex items-start gap-3 p-4 rounded-2xl shadow-sm bg-white transition hover:shadow-md ${
                !n.isRead ? "border-l-4 border-blue-500 bg-blue-50" : ""
              }`}
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-white">
                {n.sender.name.charAt(0).toUpperCase()}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-gray-800 text-sm leading-relaxed">
                  <span className="font-semibold">{n.sender.name}</span>{" "}
                  {n.type === "follow" && "followed you"}
                  {n.type === "like" && "liked your post"}
                  {n.type === "comment" && (
                    <>
                      commented:{" "}
                      <span className="italic text-gray-600">
                        "{n.commentText || "Nice post!"}"
                      </span>
                    </>
                  )}
                </p>

                {n.post && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    "{n.post.content}"
                  </p>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
