import User from "../models/User.js";

import Project from "../models/Project.js";

import Task from "../models/Task.js";

export const getDashboardStats =
  async (req, res) => {
    try {
      const totalUsers =
        await User.countDocuments();

      const totalProjects =
        await Project.countDocuments();

      const totalTasks =
        await Task.countDocuments();

      const completedTasks =
        await Task.countDocuments({
          status: "DONE",
        });

      const todoTasks =
        await Task.countDocuments({
          status: "TODO",
        });

      const progressTasks =
        await Task.countDocuments({
          status: "IN_PROGRESS",
        });

      const highPriority =
        await Task.countDocuments({
          priority: "HIGH",
        });

      const mediumPriority =
        await Task.countDocuments({
          priority: "MEDIUM",
        });

      const lowPriority =
        await Task.countDocuments({
          priority: "LOW",
        });

      res.json({
        totalUsers,
        totalProjects,
        totalTasks,
        completedTasks,

        statusStats: [
          {
            name: "TODO",
            value: todoTasks,
          },
          {
            name: "IN_PROGRESS",
            value: progressTasks,
          },
          {
            name: "DONE",
            value: completedTasks,
          },
        ],

        priorityStats: [
          {
            name: "HIGH",
            value: highPriority,
          },
          {
            name: "MEDIUM",
            value: mediumPriority,
          },
          {
            name: "LOW",
            value: lowPriority,
          },
        ],
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };