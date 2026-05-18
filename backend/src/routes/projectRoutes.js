import express from "express";

import protect from "../middlewares/authMiddleware.js";

import adminMiddleware from "../middlewares/adminMiddleware.js";

import {
  createProject,
  getProjects,
  addMemberToProject,
  deleteProject,
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

router.put(
  "/:id/members",
  protect,
  adminMiddleware,
  addMemberToProject
);
router.delete(
  "/:id",
  protect,
  adminMiddleware,
  deleteProject
);

export default router;