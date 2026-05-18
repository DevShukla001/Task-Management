import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      return toast.error(
        "Please fill all fields"
      );
    }

    if (formData.password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    try {
      setLoading(true);

      const { data } = await API.post(
        "/auth/register",
        formData
      );

      toast.success(
        "Registration successful"
      );

      console.log(data);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-cyan-400 mb-3">
            TaskFlow
          </h1>

          <p className="text-slate-400">
            Create your account
          </p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm text-slate-400 mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={changeHandler}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-slate-400 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={changeHandler}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-slate-400 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={changeHandler}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-slate-400 mb-2">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={changeHandler}
              className="bg-slate-500 text-black border border-white/10 p-4 rounded-xl outline-none"
              // className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-400"
            >
              <option value="MEMBER">
                MEMBER
              </option>

              <option value="ADMIN">
                ADMIN
              </option>
            </select>
          </div>

          <button
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-4 rounded-xl font-bold text-lg disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-cyan-400 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;