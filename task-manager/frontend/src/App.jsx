import './App.css'
import TaskList from './compoents/TaskList'
import TaskFilter from './compoents/TaskFilter'
import AddTask from './compoents/AddTask'
import { useState } from 'react'

function App() {
  const [filter, setFilter] = useState("all")
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])

  const validateTask = (task) => {
      if (!task.title || !task.description || !task.priority) {
          alert("Please fill in all fields");
          return false;
      }
      if (task.priority !== "low" && task.priority !== "medium" && task.priority !== "high") {
          alert("Priority must be low, medium, or high");
          return false;
      }
      return true;
  }
  
  const filterTasks = (filterBy=filter, tasksToFilter=tasks) => {
      if (filterBy === "all"){
          setFilteredTasks(tasksToFilter);
      } else if (filterBy === "completed"){
          setFilteredTasks(tasksToFilter.filter(task => task.completed === true));
      } else if (filterBy === "pending"){
          setFilteredTasks(tasksToFilter.filter(task => task.completed === false));
      }
  }

  return (
    <>
      <TaskFilter filterTasks={filterTasks} setFilter={setFilter} />
      <TaskList tasks={tasks} setTasks={setTasks} filteredTasks={filteredTasks} setFilteredTasks={setFilteredTasks} filterTasks={filterTasks} filter={filter} validateTask={validateTask} />
      <AddTask setTasks={setTasks} filterTasks={filterTasks} tasks={tasks} filter={filter} validateTask={validateTask} />

    </>
  )
}

export default App
