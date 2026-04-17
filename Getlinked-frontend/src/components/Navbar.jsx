import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import API from "../api/axios";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Real user state
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

  // Initials
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  // Notifications state
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

    //auto refresh every 10 sec
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  // Correct unread logic
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const displayCount = unreadCount > 9 ? "9+" : unreadCount;

  //Nav items
  const navItems = useMemo(
    () => [
      { to: "/feed", label: "Feed", icon: <FaHome size={20} /> },
      { to: "/search", label: "Search", icon: <FaSearch size={20} /> },
      {
        to: "/notifications",
        label: "Notifications",
        icon: <FaBell size={20} />,
        badge: unreadCount,
      },
      { to: "/profile", label: "Profile", icon: <FaUser size={20} /> },
    ],
    [unreadCount],
  );

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-blue-600 tracking-tight">
          Getlinked
        </h1>

        {/* Nav */}
        <div className="flex items-center gap-1 sm:gap-2 bg-white p-1 sm:p-1.5 rounded-2xl shadow-inner border overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                  isActive
                    ? "bg-white text-blue-600 shadow"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`
              }
            >
              <span className="text-sm sm:text-base">{item.icon}</span>
              <span className="hidden sm:block">{item.label}</span>

              {item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] sm:text-[10px] px-1 rounded-full">
                  {displayCount}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Avatar */}
          <NavLink
            to="/profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs sm:text-sm font-semibold shrink-0"
          >
            {initials}
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-xs sm:text-sm text-red-500 hover:bg-red-500 hover:text-white px-2 sm:px-3 py-1 rounded whitespace-nowrap"
          >
            <HiOutlineLogout size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
