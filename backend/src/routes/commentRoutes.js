import express from "express";

import protect from "../middlewares/authMiddleware.js";

import {
  createComment,
  getComments,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", protect, createComment);

router.get(
  "/:taskId",
  protect,
  getComments
);

export default router;