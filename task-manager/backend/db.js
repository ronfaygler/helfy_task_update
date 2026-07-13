const { v4: uuidv4 } = require('uuid');

const tasks = [
    {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        completed: false,
        createdAt: new Date(),
        priority: 'low'
    },
    {
        id: 2,
        title: "Task 2",
        description: "Description 2",
        completed: false,
        createdAt: new Date(),
        priority: 'medium'
    },
    {
        id: 3,
        title: "Task 3",
        description: "Description 3",
        completed: false,
        createdAt: new Date(),
        priority: 'high'
    }
]

class taskModel{
    static getAll() {
        return tasks;
    }

    static validateTask(task) {
        if (!task.title || !task.description || !task.priority) {
            return false;
        }
        if (task.priority !== 'low' && task.priority !== 'medium' && task.priority !== 'high') {
            return false;
        }
        return true;
    }
    
    static create(task) {
        if (!this.validateTask(task)) {
            return null;
        }
        const newTask = {
            id: uuidv4(),
            title: task.title,
            description: task.description,
            completed: false,
            createdAt: new Date(),
            priority: task.priority
        }
        tasks.push(newTask);
        return newTask;
    }

    static update(id, t) {
        if (!this.validateTask(t)) {
            return null;
        }
        const { title, description, priority } = t;
        const index = tasks.findIndex(task => String(task.id) === String(id));
        if (index === -1) return null;
        tasks[index].title = title;
        tasks[index].description = description;
        tasks[index].priority = priority;
        return tasks[index];
    }

    static delete(id) {
        const index = tasks.findIndex(task => String(task.id) === String(id));
        if (index === -1) return null;
        tasks.splice(index, 1);
        return true;
    }

    static toggle(id) {
        const index = tasks.findIndex(task => String(task.id) === String(id));
        if (index === -1) return null;
        tasks[index].completed = !tasks[index].completed;
        return tasks[index];
    }
}

module.exports = { taskModel };