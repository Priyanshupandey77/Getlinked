import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.accessToken);

      //   alert("Login success!!");
      navigate("/feed");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-300 px-3 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 sm:p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4 sm:space-y-5"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 text-xs sm:text-sm">
          Login to continue
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
        />

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2.5 sm:p-3 rounded-lg font-semibold transition duration-200 text-sm sm:text-base">
          Login
        </button>

        <p className="text-center text-xs sm:text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
