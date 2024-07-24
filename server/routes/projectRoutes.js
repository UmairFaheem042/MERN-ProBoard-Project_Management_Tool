const express = require("express");
const router = express.Router();
const project = require("../controllers/projectController");
const task = require("../controllers/taskController");
const { signUp, signIn } = require("../controllers/auth");

// projects
router.post("/project", project.createProject);
router.put("/project/:projectId", project.updateProject);
router.get("/:id/project", project.getProjects);
router.get("/:id/project/:projectId", project.getOneProject);
router.delete("/project/:projectId", project.deleteProject);

// tasks
router.post("/:projectId/task", task.createTask);
router.put("/:projectId/task", task.updateTask);
router.get("/:projectId/task", task.getTasks);
router.delete("/:projectId/task/:taskId", task.deleteTask);
router.patch("/:projectId/task/:taskId", task.updateTask);

// authentication
router.post("/signup", signUp);
router.post("/signin", signIn);

// Protected Routes
module.exports = router;
