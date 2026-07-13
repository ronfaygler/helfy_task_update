import { useEffect, useState } from "react";
import * as taskService from "../services/taskService";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";
// import { error } from "node:console";

function TaskList({ tasks, setTasks, filteredTasks, setFilteredTasks, filterTasks, filter, validateTask }) {
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
            taskService.getAllTasks()
            .then(data => {
                setTasks(data)
                setFilteredTasks(data)
            })
            .catch(() => {
                setError("Failed to load tasks. Please try again.");
                console.error("Failed to load tasks");
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    const handleEdit = async (task) => {
        setLoading(true);
        if (!validateTask(task)) {
            return;
        }
        try {
            const data = await taskService.updateTask(task);
            setTasks(tasks.map(task => task.id === data.id ? data : task));
            setFilteredTasks(filteredTasks.map(task => task.id === data.id ? data : task));
            setEditingTask(null);
        } catch (error) {
            console.error("Failed to update task", error);
            setError("Failed to update task. Please try again.");
        }
        setLoading(false);
    }
    
    const deleteTask = async (id) => {
        // ask for sure
        if (!confirm("Are you sure you want to delete this task?")) {
            return;
        }
        try{
            await taskService.deleteTask(id);
            setTasks(prev => prev.filter(task => task.id !== id));
            setFilteredTasks(prev => prev.filter(task => task.id !== id));
        } catch (error) {
            console.error("Failed to delete task", error);
            setError("Failed to delete task. Please try again.");
        }
    }

    const toggleComplete = async (id) => {
        try {
            const data = await taskService.toggleComplete(id, tasks);
            const currTasks = tasks.map(task => task.id === data.id ? data : task);
            setTasks(currTasks);
            setFilteredTasks(prevFiltered => prevFiltered.map(task => task.id === data.id ? data : task));
            filterTasks(filter, currTasks);
        } catch (error) {
            console.error("Failed to toggle complete", error);
            setError("Failed to toggle complete. Please try again.");
        }
    }

    return (
        <div>            
            <h2>Task List</h2>
                {error && <div className="error">{error}</div>}
                {filteredTasks.length === 0 && <div>No tasks found</div>}
                {loading ? <div>Loading...</div> : (
                <div className="carousel">
                    
                    <div className="track">
                        {filteredTasks && filteredTasks.map((task) => (
                            <TaskItem key={task.id} task={task} editingTask={editingTask} setEditingTask={setEditingTask} handleEdit={handleEdit} deleteTask={deleteTask} toggleComplete={toggleComplete} loading={loading} />
                        ))}
                    </div>
                    
                    {filteredTasks.length < 6 && 
                    <div className="track">
                        {filteredTasks && filteredTasks.map((task) => (
                            <TaskItem key={task.id} task={task} editingTask={editingTask} setEditingTask={setEditingTask} handleEdit={handleEdit} deleteTask={deleteTask} toggleComplete={toggleComplete} loading={loading} />
                        ))}
                    </div>}
                </div>
                )}
        </div>
    );
}

export default TaskList;