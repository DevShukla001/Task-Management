import express from "express";

import protect from "../middlewares/authMiddleware.js";

import {
  getTaskActivity,
} from "../controllers/activityController.js";

const router = express.Router();

router.get(
  "/:taskId",
  protect,
  getTaskActivity
);

export default router;