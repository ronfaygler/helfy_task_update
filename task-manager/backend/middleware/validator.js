const validateTask = (req, res, next) => {
    const { title, description, priority } = req.body;
    if (!title || !description || !priority) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    if (typeof title !== 'string' || typeof description !== 'string' || typeof priority !== 'string') {
        return res.status(400).json({ error: "Invalid data types" });
    }
    if (priority !== 'low' && priority !== 'medium' && priority !== 'high') {
        return res.status(400).json({ error: "Invalid priority" });
    }
    if (title.length > 100) {
        return res.status(400).json({ error: "Title too long" });
    }
    if (description.length > 500) {
        return res.status(400).json({ error: "Description too long" });
    }
    next();
}

module.exports = validateTask;
