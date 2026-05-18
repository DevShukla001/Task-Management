import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      project,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      project,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "ADMIN") {
      tasks = await Task.find()
        .populate("assignedTo")
        .populate("createdBy")
        .populate("project");
    } else {
      tasks = await Task.find({
        assignedTo: req.user._id,
      })
        .populate("assignedTo")
        .populate("createdBy")
        .populate("project");
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTaskStatus = async (
  req,
  res
) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const isAdmin =
      req.user.role === "ADMIN";

    const isAssigned =
      task.assignedTo?.toString() ===
      req.user._id.toString();

    if (!isAdmin && !isAssigned) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    task.status = req.body.status;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTask = async (
  req,
  res
) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};