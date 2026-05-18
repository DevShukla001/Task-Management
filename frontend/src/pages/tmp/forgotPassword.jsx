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

      // 🔥 redirect to reset page with token
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-md border border-slate-800">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          Forgot Password
        </h1>

        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 mb-6"
          />

          <button
            disabled={loading}
            className="w-full bg-cyan-500 py-4 rounded-xl font-bold disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;