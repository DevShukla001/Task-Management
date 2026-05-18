import express from "express";

import protect from "../middlewares/authMiddleware.js";

import adminMiddleware from "../middlewares/adminMiddleware.js";

import {
  getDashboardStats,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/stats",
  protect,
  adminMiddleware,
  getDashboardStats
);

export default router;