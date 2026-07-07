import { useEffect, useState } from "react";
function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000/api/tasks")
            .then(res => res.json())
            .then(data => setTasks(data))
            .then(() => setFilteredTasks(data));
    }, []);

    const handleEdit = async (task) => {
        const response = await fetch("http://localhost:4000/api/tasks/" + task.id,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description, priority }),
        })
        const data = await response.json();
        setTasks(tasks.map(task => task.id === data.id ? data : task));
        console.log("Edit task:", task);
    }
    
    const onsubmit = async (e) => {
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
        setFilteredTasks([...filteredTasks, data]);
        setTitle("");
        setDescription("");
        setPriority("");
        console.log(data);
    }

    const deleteTask = async (id) => {
        // ask for sure
        if (!confirm("Are you sure you want to delete this task?")) {
            return;
        }
        await fetch(`http://localhost:4000/api/tasks/${id}`, { method: "DELETE" });
        setTasks(prev => prev.filter(task => task.id !== id));
        setFilteredTasks(prev => prev.filter(task => task.id !== id));
    }

    const toggleComplete = async (id) => {
        const response = await fetch(`http://localhost:4000/api/tasks/${id}/toggle`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: !tasks.find(task => task.id === id).completed }),
        });
        const data = await response.json();
        setTasks(tasks.map(task => task.id === data.id ? data : task));
        setFilteredTasks(filteredTasks.map(task => task.id === data.id ? data : task));
    }

    const filterTasks = (filter) => {
        if (filter === "all"){
            setFilteredTasks(tasks);
        } else if (filter === "completed"){
            setFilteredTasks(tasks.filter(task => task.completed === true));
        } else if (filter === "not completed"){
            setFilteredTasks(tasks.filter(task => task.completed === false));
        }
    }

    return (
        <div>
            <h2> Filter </h2>
            <select onChange={(e) => filterTasks(e.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="not completed">Not Completed</option>
            </select>

            <h2>Task List</h2>
             <div className="carousel">
                <div className="track">
                {filteredTasks.map((task) => (
                <div className="task-card" key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>{task.completed ? "Completed" : "Not Completed"}</p>
                    <p>{task.priority}</p>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                    <input 
                        type="checkbox" 
                        style={{ width: "100px", height: "100px" }}
                        checked={task.completed} 
                        onChange={() => toggleComplete(task.id)} 
                    />
                </div>
                ))}
                </div>
                
                <div className="track">
                {filteredTasks.map((task) => (
                <div className="task-card" key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>{task.completed ? "Completed" : "Not Completed"}</p>
                    <p>{task.priority}</p>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                    <input 
                        type="checkbox" 
                        style={{ width: "100px", height: "100px" }}
                        checked={task.completed} 
                        onChange={() => toggleComplete(task.id)} 
                    />
                </div>
                ))}
                </div>
        </div>
            <h2>Add Task</h2>
            <form onSubmit={onsubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
                <button type="submit">Add Task</button>
            </form>

        </div>
    );
}

export default TaskList;