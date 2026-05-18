import express from "express";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔐 PASSWORD RESET ROUTES
router.post("/forgot-password", forgotPassword);
// router.post("/forgot-password", (req, res) => {
//   res.json({ ok: true });
// });
router.post("/reset-password/:token", resetPassword);

export default router;