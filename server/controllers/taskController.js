const Task = require("../models/taskModel");
const Project = require("../models/projectModel");

exports.getTasks = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const tasks = await Task.find({ project: projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  const projectId = req.params.projectId;
  const { title } = req.body;
  try {
    const task = new Task({ title, project: projectId });
    await task.save();

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.tasks.push(task._id);
    await project.save();

    res.status(200).json(project);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { taskId, title, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        status,
      },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    // Find the task and delete it
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Remove the task reference from the project
    await Project.updateMany({ tasks: taskId }, { $pull: { tasks: taskId } });

    // Delete the task
    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;

  const { status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      {
        new: true,
      }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
