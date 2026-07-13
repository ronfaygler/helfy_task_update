
import { useState } from "react";
import { createTask } from "../services/taskService";

function AddTask({ setTasks, filterTasks, tasks, filter, validateTask }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const addTask = async (e) => {
        e.preventDefault();
        if (!validateTask({ title, description, priority })) {
            return;
        }
        setLoading(true);
        try{
            const data = await createTask({ title, description, priority });
            setTasks([...tasks, data]);
            filterTasks(filter, [...tasks, data]);
            setTitle("");
            setDescription("");
            setPriority("");
        } catch (error) {
            setError("Failed to add task. Please try again.");
            console.error("Failed to add task", error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h2>Add Task</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={addTask}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
                <button type="submit">
                    {loading ? "Adding..." : "Add Task"}
                </button>
            </form>
        </>
    );
}

export default AddTask;