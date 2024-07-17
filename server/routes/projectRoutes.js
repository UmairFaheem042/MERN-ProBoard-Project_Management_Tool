const express = require("express");
const router = express.Router();
const project = require("../controllers/projectController");
const task = require("../controllers/taskController");

// projects
router.post("/project", project.createProject);
router.put("/project/:projectId", project.updateProject);
router.get("/project", project.getProjects);
router.get("/project/:projectId", project.getOneProject);
router.delete("/project/:projectId", project.deleteProject);

// tasks
router.post("/:projectId/task", task.createTask);
router.put("/:projectId/task", task.updateTask);
router.get("/:projectId/task", task.getTasks);
router.delete("/:projectId/task/:taskId", task.deleteTask);
router.patch("/:projectId/task/:taskId", task.updateTask);

module.exports = router;
