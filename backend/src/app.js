import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
// app.use(cors());
// app.use(cors({
//   origin: *,
//   credentials: true
// }));
app.use(cors({
  origin: "*"
}));
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

app.use("/api/activity", activityRoutes);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.get("/", (req, res) => {
  res.send("API Running");
});

export default app;
