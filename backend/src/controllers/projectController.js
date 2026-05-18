import Project from "../models/Project.js";
// const Task = require("../models/Task");
import Task from "../models/Task.js"

export const createProject = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      members,
    } = req.body;

    const project = await Project.create({
      title,
      description,
      members,
      createdBy: req.user._id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProjects = async (
  req,
  res
) => {
  try {
    let projects;

    if (req.user.role === "ADMIN") {
      projects = await Project.find()
        .populate("members")
        .populate("createdBy");
    } else {
      projects = await Project.find({
        members: req.user._id,
      })
        .populate("members")
        .populate("createdBy");
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// controllers/projectController.js

// const Project = require("../models/Project");


export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    // 1. Delete all tasks linked to this project
    await Task.deleteMany({ project: projectId });

    // 2. Delete the project
    await Project.findByIdAndDelete(projectId);

    res.json({ message: "Project and related tasks deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// module.exports = { deleteProject };

export const addMemberToProject =
  async (req, res) => {
    try {
      const project =
        await Project.findById(
          req.params.id
        );

      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      if (
        !project.members.includes(
          req.body.userId
        )
      ) {
        project.members.push(
          req.body.userId
        );
      }

      await project.save();

      res.json(project);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };