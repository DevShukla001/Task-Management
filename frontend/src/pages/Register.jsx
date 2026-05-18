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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      const { data } = await API.post("/auth/register", formData);

      toast.success("Account created successfully");

      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md">
        {/* CARD */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-cyan-400">
              TaskFlow
            </h1>
            <p className="text-white/50 mt-2">
              Create your account to continue
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={submitHandler} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={changeHandler}
              className={inputClass}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={changeHandler}
              className={inputClass}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={changeHandler}
              className={inputClass}
            />

            <select
              name="role"
              value={formData.role}
              onChange={changeHandler}
              className={inputClass}
            >
              <option value="MEMBER">MEMBER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full mt-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-white/50 mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-cyan-400 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;