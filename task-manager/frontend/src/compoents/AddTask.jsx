
import { useState } from "react";

function AddTask({ setTasks, filterTasks, tasks, filter }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    
    const addTask = async (e) => {
        e.preventDefault();
        if (!title || !description || !priority) {
            alert("Please fill in all fields");
            return;
        }
        if (priority !== "low" && priority !== "medium" && priority !== "high") {
            alert("Priority must be low, medium, or high");
            return;
        }
        const response = await fetch("http://localhost:4000/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description, priority }),
        });
        const data = await response.json();
        setTasks([...tasks, data]);
        filterTasks(filter, [...tasks, data]);
        setTitle("");
        setDescription("");
        setPriority("");
        console.log(data);
    }

    return (
        <>
            <h2>Add Task</h2>
            <form onSubmit={addTask}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
                <button type="submit">Add Task</button>
            </form>
        </>
    );
}

export default AddTask;