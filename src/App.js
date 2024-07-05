// Import components
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'

// Import libraries
import {v4 as uuidV4} from 'uuid'  // For unique Id genration
import { useState } from 'react'   // useState hook for managing state

// Import custom styles
import './App.css'

const App = () => {
  // Retrieve stored tasks from localStorage (if available) and set the initial state
  const storedTodos = JSON.parse(localStorage.getItem("tasksList"))
  const [tasksList, setTasks] = useState(storedTodos !== null ? storedTodos:[])

  // State variable to store the isShow state
  const [isShow, setIsShow] = useState(false)

  // Function to toggle the visibility of the task list
  const onSetIsShow = () => {
    setIsShow(!isShow)
  }

  // Function to add a new task
  const addNewTask = (newTask) => {
    // Create a new task object with an unique ID, the new task text, and initial status (false for incomplete)
    const createNewTask = {
      id: uuidV4(),
      newTask,
      status : false
    }

    // Update the tasksList state by adding the new task object to the existing list
    setTasks([...tasksList, createNewTask])
  }

  // Function to remove a task by its ID
  const removeTask = (taskId) => {
    setTasks(tasksList.filter((task) => task.id !== taskId));
  }

  // Function to change the status (completed/incomplete) of a task by its ID
  const changeTaskStatus = (taskId) => {
    setTasks(tasksList.map((task) => task.id === taskId ? {...task, status: !task.status} : task))
  }
  
  // Function to edit a task by its ID and update its text
  const editTask = (taskId, updateValue='') => {
    setTasks(tasksList.map((task) => task.id === taskId ? {...task, newTask:updateValue} : task))
  }
  
  // Function to save the current task list to localStorage
  const handleSaveClick = () => {
    localStorage.setItem("tasksList", JSON.stringify(tasksList))
  }
  
  return(
    <div className='container d-flex flex-column align-items-center p-5'>
      <h1 className="main-heading">Todo List</h1>
      {/* Task input component for adding new tasks */}
      <TaskInput onAddTask={addNewTask}/>
      <div className='align-self-start'>
        {/* Buttons to save tasks to localStorage and toggle task list visibility */}
        <button type='button' className='btn btn-success mr' onClick={handleSaveClick}>Save Tasks</button>
        <button type='button' className='btn btn-secondary mr' onClick={onSetIsShow}>{isShow? 'Hide Tasks' : 'View Tasks'}</button>
      </div>

      {/* Conditionally render the TaskList component based on the isShow state */}
      {isShow && <TaskList tasksList={tasksList} onRemoveTask={removeTask} onChangeTaskStatus={changeTaskStatus} onEditTask={editTask}/>}
    </div>
  )
}


export default App