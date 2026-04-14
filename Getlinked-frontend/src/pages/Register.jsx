import { useState } from "react";
import API from "../api/axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
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

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-md rounded w-80"
      >
        <h2 className="text-xl mb-4">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full mb-2 p-2 border"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-2 p-2 border"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-2 p-2 border"
        />

        <button className="w-full bg-green-500 text-white p-2">Register</button>
      </form>
    </div>
  );
}

export default Register;
