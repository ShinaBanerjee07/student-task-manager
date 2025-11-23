const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

// Get all tasks of logged-in user
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId }).sort({ createdAt: -1 });
  res.json(tasks);
});

// Add new task
router.post("/", auth, async (req, res) => {
  const { title } = req.body;
  const task = await Task.create({ title, userId: req.user.userId });
  res.json(task);
});

// Toggle task complete/incomplete
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.isCompleted = !task.isCompleted;
  await task.save();
  res.json(task);
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, userId: req.user.userId });
  res.json({ message: "Task deleted" });
});

module.exports = router;

