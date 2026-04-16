import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import API from "../api/axios";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ Real user state
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  // ✅ Initials
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  // ✅ Notifications state
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // 🔥 optional: auto refresh every 10 sec
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Correct unread logic
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const displayCount = unreadCount > 9 ? "9+" : unreadCount;

  // ✅ Nav items
  const navItems = useMemo(
    () => [
      { to: "/feed", label: "Feed", icon: "🏠" },
      { to: "/search", label: "Search", icon: "🔍" },
      {
        to: "/notifications",
        label: "Notifications",
        icon: "🔔",
        badge: unreadCount,
      },
      { to: "/profile", label: "Profile", icon: "👤" },
    ],
    [unreadCount],
  );

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
          Getlinked
        </h1>

        {/* Nav */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-inner border">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-blue-600 shadow"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`
              }
            >
              <span>{item.icon}</span>
              <span className="hidden sm:block">{item.label}</span>

              {item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                  {displayCount}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <NavLink
            to="/profile"
            className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold"
          >
            {initials}
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
