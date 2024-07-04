import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import {v4 as uuidV4} from 'uuid'
import './App.css'
import { useState } from 'react'

const App = () => {
  const [tasksList, setTasks] = useState([])
  const addNewTask = (newTask) => {
    const createNewTask = {
      id: uuidV4(),
      newTask,
      status : false
    }
    setTasks([...tasksList, createNewTask])
  }

  const removeTask = (taskId) => {
    setTasks(tasksList.filter((task) => task.id !== taskId));
  };

  const changeTaskStatus = (taskId) => {
    setTasks(tasksList.map((task) => task.id === taskId ? {...task, status: !task.status} : task))
  }
  
  const editTask = (taskId, updateValue='') => {
    setTasks(tasksList.map((task) => task.id === taskId ? {...task, newTask:updateValue} : task))
  }

  return(
    <div className='d-flex flex-column align-items-center p-5'>
      <h1 className="main-heading">Todo List</h1>
      <TaskInput onAddTask={addNewTask}/>
      <TaskList tasksList={tasksList} onRemoveTask={removeTask} onChangeTaskStatus={changeTaskStatus} onEditTask={editTask}/>
    </div>
  )
}


export default App