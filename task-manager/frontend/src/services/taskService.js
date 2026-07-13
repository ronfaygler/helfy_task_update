const API_BASE_URL = "http://localhost:4000/api/tasks/";

export async function getAllTasks() {
    const response = await fetch("http://localhost:4000/api/tasks");
    return response.json();
}

export async function updateTask(task) {
    const response = await fetch("http://localhost:4000/api/tasks/" + task.id,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: task.title, description: task.description, priority: task.priority }),
    })
    const data = await response.json();
    return data;
}

export async function createTask(task) {
    const response = await fetch("http://localhost:4000/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: task.title, description: task.description, priority: task.priority }),
    })
    const data = await response.json();
    return data;
}

export async function deleteTask(id) {
    const response = await fetch("http://localhost:4000/api/tasks/" + id, {
        method: "DELETE",
    })
    const data = await response.json();
    return data;
}

export async function toggleComplete(id, tasks) {
    const response = await fetch("http://localhost:4000/api/tasks/" + id + "/toggle", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !tasks.find(task => task.id === id).completed }),
    })
    const data = await response.json();
    return data;
}