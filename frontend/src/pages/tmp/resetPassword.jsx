import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!password) return toast.error("Password required");

    try {
      setLoading(true);

      await API.post(`/auth/reset-password/${token}`, {
        password,
      });

      toast.success("Password reset successful");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-md border border-slate-800">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          Reset Password
        </h1>

        <form onSubmit={submitHandler}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 mb-6"
          />

          <button
            disabled={loading}
            className="w-full bg-cyan-500 py-4 rounded-xl font-bold disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;