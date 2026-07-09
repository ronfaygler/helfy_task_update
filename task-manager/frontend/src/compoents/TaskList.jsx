import { useEffect } from "react";

function TaskList({ tasks, setTasks, filteredTasks, setFilteredTasks, filterTasks, filter }) {
    useEffect(() => {
        fetch("http://localhost:4000/api/tasks")
            .then(res => res.json())
            .then(data => {
                setTasks(data);
                setFilteredTasks(data);
            });
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
        console.log("tasks", tasks);
        const task = tasks.find(task => task.id === id);
        console.log("task", task);
        const response = await fetch(`http://localhost:4000/api/tasks/${id}/toggle`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: !tasks.find(task => task.id === id).completed }),
        });
        const data = await response.json();
        const currTasks = tasks.map(task => task.id === data.id ? data : task);
        setTasks(currTasks);
        setFilteredTasks(prevFiltered => prevFiltered.map(task => task.id === data.id ? data : task));
        filterTasks(filter, currTasks);
    }

    return (
        <div>            
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
        </div>
    );
}

export default TaskList;