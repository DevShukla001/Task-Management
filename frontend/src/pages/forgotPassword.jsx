import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Email required");

    try {
      setLoading(true);

      const { data } = await API.post("/auth/forgot-password", {
        email,
      });

      toast.success("Reset link generated");

      navigate(`/reset-password/${data.resetToken}`);

      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send link"
      );
    } finally {
      setLoading(false);
    }
  };

  const cardClass =
    "bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl backdrop-blur-xl";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md">
        {/* CARD */}
        <div className={cardClass}>
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
              <span className="text-cyan-400 text-2xl">🔐</span>
            </div>

            <h1 className="text-3xl font-bold text-white">
              Forgot Password
            </h1>

            <p className="text-white/50 mt-2 text-sm">
              Enter your email to receive a reset link
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="text-white/60 text-sm">
                Email Address
              </label>

              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            <button
              disabled={loading}
              className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending reset link..." : "Send Reset Link"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-white/40 text-sm mt-6">
            We’ll send a secure link to your email
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;