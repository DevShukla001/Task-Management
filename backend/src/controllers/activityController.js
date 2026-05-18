import Activity from "../models/Activity.js";

export const getTaskActivity =
  async (req, res) => {
    try {
      const activities =
        await Activity.find({
          task: req.params.taskId,
        })
          .populate("user")
          .sort({
            createdAt: -1,
          });

      res.json(activities);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };