import Project from "../models/Project.js";

export const createProject = async (
  req,
  res
) => {
  try {
    const { title, description } =
      req.body;

    const project = await Project.create({
      title,
      description,
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
    const projects = await Project.find();

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};