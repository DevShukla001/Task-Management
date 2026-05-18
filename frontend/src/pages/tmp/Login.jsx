import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const { data } = await API.post("/auth/login", formData);

      localStorage.setItem("userInfo", JSON.stringify(data));

      toast.success("Welcome back 👋");

      setTimeout(() => navigate("/dashboard"), 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#050816] overflow-hidden px-4">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/30 blur-[120px] rounded-full top-[-100px] left-[-100px] animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/30 blur-[120px] rounded-full bottom-[-120px] right-[-120px] animate-pulse" />
        <div className="absolute w-[300px] h-[300px] bg-blue-500/30 blur-[120px] rounded-full top-[40%] left-[60%] animate-pulse" />
      </div>

      {/* MAIN CARD */}
      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center p-12 relative">
          <div className="space-y-6 text-white">

            <span className="px-4 py-2 text-xs bg-white/10 rounded-full w-fit">
              Office Task Suite
            </span>

            <h1 className="text-5xl font-bold leading-tight">
              Run projects like a calm,
              <br />
              <span className="text-cyan-400">organized system.</span>
            </h1>

            <p className="text-white/70 max-w-md">
              Manage tasks, teams, deadlines and workflows in one clean dashboard built for modern teams.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {["Smart Tasks", "Team Flow", "Deadline Control"].map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 text-xs bg-white/10 rounded-full hover:bg-white/20 transition"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              Team Task Manager
            </h2>
            <p className="text-white/60 mt-2 text-sm">
              Sign in to continue to your workspace
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={submitHandler} className="space-y-5">

            <div>
              <label className="text-xs text-white/60">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder="you@example.com"
                className="w-full mt-2 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:border-cyan-400 transition"
              />
            </div>

            <div>
              <label className="text-xs text-white/60">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                placeholder="••••••••"
                className="w-full mt-2 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:border-cyan-400 transition"
              />
            </div>

            <button
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* LINKS */}
          <div className="mt-6 text-center text-sm text-white/60">
            New here?{" "}
            <Link className="text-cyan-400 hover:underline" to="/register">
              Create account
            </Link>
          </div>

          <div className="text-center mt-3">
            <Link
              to="/forgot-password"
              className="text-xs text-white/50 hover:text-cyan-300"
            >
              Forgot password?
            </Link>
          </div>

          {/* SECURITY BADGE */}
          <div className="mt-6 text-xs text-white/40 text-center bg-white/5 border border-white/10 p-3 rounded-xl">
            🔒 Secure JWT authentication with encrypted credentials
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;