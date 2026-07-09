import './App.css'
import TaskList from './compoents/TaskList'
import Filter from './compoents/Filter'
import AddTask from './compoents/AddTask'
import { useState } from 'react'

function App() {
  const [filter, setFilter] = useState("all")
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])

  const filterTasks = (filterBy=filter, tasksToFilter=tasks) => {
      if (filterBy === "all"){
          setFilteredTasks(tasksToFilter);
      } else if (filterBy === "completed"){
          setFilteredTasks(tasksToFilter.filter(task => task.completed === true));
      } else if (filterBy === "not completed"){
          setFilteredTasks(tasksToFilter.filter(task => task.completed === false));
      }
  }

  return (
    <>
      <Filter filterTasks={filterTasks} setFilter={setFilter} />
      <TaskList tasks={tasks} setTasks={setTasks} filteredTasks={filteredTasks} setFilteredTasks={setFilteredTasks} filterTasks={filterTasks} filter={filter} />
      <AddTask setTasks={setTasks} filterTasks={filterTasks} tasks={tasks} filter={filter} />

    </>
  )
}

export default App
