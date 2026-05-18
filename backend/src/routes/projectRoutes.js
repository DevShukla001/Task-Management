import express from "express";

import protect from "../middlewares/authMiddleware.js";

import adminMiddleware from "../middlewares/adminMiddleware.js";

import {
  createProject,
  getProjects,
} from "../controllers/projectController.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getProjects)
  .post(
    protect,
    adminMiddleware,
    createProject
  );

export default router;