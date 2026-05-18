import express from "express";

import protect from "../middlewares/authMiddleware.js";

import adminMiddleware from "../middlewares/adminMiddleware.js";

import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getTasks)
  .post(
    protect,
    adminMiddleware,
    createTask
  );

router.put(
  "/:id/status",
  protect,
  updateTaskStatus
);

router.delete(
  "/:id",
  protect,
  adminMiddleware,
  deleteTask
);

export default router;