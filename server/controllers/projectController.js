const Project = require("../models/projectModel");
const Task = require("../models/taskModel");
const User = require("../models/user");

exports.getProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("projects");
    // const projects = await Project.find().populate("tasks");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.projects);
    // res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneProject = async (req, res) => {
  const projectId = req.params.projectId;
  const { id } = req.params;
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
  const { title, id } = req.body;
  try {
    const newProject = new Project({ title });
    await newProject.save();

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.projects.push(newProject._id);
    await user.save();
    res.status(201).json({ success: true, project: newProject });
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

    // update User too
    await User.updateMany(
      { projects: projectId },
      { $pull: { projects: projectId } }
    );

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
