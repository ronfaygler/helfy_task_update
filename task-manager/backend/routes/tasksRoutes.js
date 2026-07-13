const { Router } = require("express");
const router = Router();
const { taskModel } = require("../db.js");
const validateTask = require("../middleware/validator.js");

// Get all tasks
router.get("/", (req, res) => {
    try{
        const tasks = taskModel.getAll();
        if (!tasks) {
            return res.status(200).json({ tasks: [] });
        }
        res.status(200).json(tasks);
    }
    catch(error){
        res.status(500).json({ error: "Failed to get tasks" });
    }
});

// Create a new task
router.post("/", validateTask, (req, res) => {
    try{
        const { title, description, priority } = req.body;
        const task = taskModel.create({ title, description, priority });
        if (!task) {
            return res.status(400).json({ error: "The task could not be created due to missing or invalid fields" });
        }
        res.status(201).json(task);
    }
    catch(error){
        res.status(500).json({ error: "Failed to create task" });
    }
});

// Update a task
router.put("/:id", validateTask, (req, res) => {
    try{
        const id = req.params.id;
        const { title, description, priority } = req.body;
        const task = taskModel.update(id, { title, description, priority });
        if (!task){
            return res.status(404).json({ error: "The task does not exist" });
        }
        res.status(200).json(task);
    }
    catch(error){
        res.status(500).json({ error: "Failed to update task" });
    }
});

// Delete a task
router.delete("/:id", (req, res) => {
    try{
        const id = req.params.id;
        const task = taskModel.delete(id);
        if (!task){
            return res.status(404).json({ error: "The task does not exist" });
        }
        res.status(200).json(task);
    }
    catch(error){
        res.status(500).json({ error: "Failed to delete task" });
    }
});

// Toggle a task
router.patch("/:id/toggle", (req, res) => {
    try{
        const id = req.params.id;
        const task = taskModel.toggle(id);
        if (!task){
            return res.status(404).json({ error: "The task does not exist" });
        }
        res.status(200).json(task);
    }
    catch(error){
        res.status(500).json({ error: "Failed to toggle task" });
    }
});

module.exports = router;