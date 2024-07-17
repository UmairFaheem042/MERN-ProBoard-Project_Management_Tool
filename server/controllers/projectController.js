const Project = require("../models/projectModel");
const Task = require("../models/taskModel");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("tasks");
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getOneProject = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId);

    if (project.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.createProject = async (req, res) => {
  const { title } = req.body;
  try {
    const newProject = new Project({ title });
    await newProject.save();
    res.status(200).json(newProject);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  const projectId = req.params.projectId;
  const { title } = req.body;
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        title,
        updatedAt: Date.now(),
      },
      { new: true }
    )
      .populate("tasks")
      .exec();
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    await Task.deleteMany({ project: projectId });
    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
