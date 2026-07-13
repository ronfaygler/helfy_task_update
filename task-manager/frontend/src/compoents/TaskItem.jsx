
import "../styles/TaskItem.css";

function TaskItem({ task, editingTask, setEditingTask, deleteTask, toggleComplete, handleEdit, loading }) {
    return (
        <div className="task-card" key={task.id}>
            {editingTask?.id === task.id ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    Task: 
                    <input 
                        style={{ marginLeft:"30%", textAlign: "center", width: "200px", marginBottom: "10px" }} 
                        type="text" 
                        value={editingTask.title} 
                        onChange={(e) => setEditingTask({...editingTask, title: e.target.value})} />
                    Description: 
                        <input 
                            style={{ marginLeft:"30%", textAlign: "center", width: "200px", marginBottom: "10px" }} 
                            type="text" 
                            value={editingTask.description} 
                            onChange={(e) => setEditingTask({...editingTask, description: e.target.value})} 
                        />
                    Priority: 
                    <select 
                        style={{ marginLeft:"30%", textAlign: "center", width: "200px", marginBottom: "10px" }} 
                        value={editingTask.priority} 
                        onChange={(e) => setEditingTask({...editingTask, priority: e.target.value})} >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button 
                        style={{ marginLeft:"30%", width: "200px" }} 
                        onClick={() => handleEdit(editingTask)}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            ):(
            <>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            {["high","medium", "low"].map(priority => {
                if (task.priority == priority) {
                    return <span className={`priority-badge ${task.priority}`}>
                        {task.priority}
                        </span>
                }
                return null;
            })}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <input 
                type="checkbox" 
                style={{ width: "100px", height: "100px" }}
                checked={task.completed} 
                onChange={() => toggleComplete(task.id)} 
            />
            <button onClick={() => {
                setEditingTask(task);
                }}
                >Edit</button>
            </>
            )}
        </div>
    );
}

export default TaskItem;