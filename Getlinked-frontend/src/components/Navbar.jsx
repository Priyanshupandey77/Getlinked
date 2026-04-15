import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Getlinked</h1>

      <div className="space-x-4">
        <NavLink
          to="/feed"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : ""
          }
        >
          Feed
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : ""
          }
        >
          Search
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : ""
          }
        >
          🔔 Notifications
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : ""
          }
        >
          Profile
        </NavLink>

        <button onClick={handleLogout} className="text-red-500">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
