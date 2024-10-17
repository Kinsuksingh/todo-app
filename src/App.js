// Import components
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

// Import libraries
import { v4 as uuidV4 } from 'uuid'; // For unique Id generation
import { useState } from 'react';    // useState hook for managing state

const App = () => {
  // Retrieve stored tasks from localStorage (if available) and set the initial state
  const storedTodos = JSON.parse(localStorage.getItem("tasksList"));
  const [tasksList, setTasks] = useState(storedTodos !== null ? storedTodos : []);

  // State variables to track theme and task list visibility
  const [isShow, setIsShow] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // New state for dark mode

  // Function to toggle the visibility of the task list
  const onSetIsShow = () => {
    setIsShow(!isShow);
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Function to add a new task
  const addNewTask = (newTask) => {
    const createNewTask = {
      id: uuidV4(),
      newTask,
      status: false,
    };
    setTasks([...tasksList, createNewTask]);
  };

  // Function to remove a task by its ID
  const removeTask = (taskId) => {
    setTasks(tasksList.filter((task) => task.id !== taskId));
  };

  // Function to change the status (completed/incomplete) of a task by its ID
  const changeTaskStatus = (taskId) => {
    setTasks(tasksList.map((task) => (task.id === taskId ? { ...task, status: !task.status } : task)));
  };

  // Function to edit a task by its ID and update its text
  const editTask = (taskId, updateValue = '') => {
    setTasks(tasksList.map((task) => (task.id === taskId ? { ...task, newTask: updateValue } : task)));
  };

  // Function to save the current task list to localStorage
  const handleSaveClick = () => {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  };

  // Inline styles for elements
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px',
      backgroundColor: isDarkMode ? '#181818' : '#ffffff', // Dark mode background
      color: isDarkMode ? '#f0f0f0' : '#000000', // Dark mode text color
      transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    heading: {
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: '50px',
      fontWeight: 'bold',
    },
    button: {
      marginRight: '15px',
      marginTop: '15px',
      minWidth: '95px',
    },
    buttonGroup: {
      alignSelf: 'start',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Todo List</h1>

      {/* Dark Mode Toggle Button */}
      <button type='button' className='btn btn-dark' style={styles.button} onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Task input component for adding new tasks */}
      <TaskInput onAddTask={addNewTask} isDarkMode={isDarkMode} />

      <div style={styles.buttonGroup}>
        {/* Buttons to save tasks to localStorage and toggle task list visibility */}
        <button type='button' className='btn btn-success' style={styles.button} onClick={handleSaveClick}>
          Save Tasks
        </button>
        <button
          type='button'
          className={isShow ? 'btn btn-secondary' : 'btn btn-info'}
          style={styles.button}
          onClick={onSetIsShow}
        >
          {isShow ? 'Hide Tasks' : 'View Tasks'}
        </button>
      </div>

      {/* Conditionally render the TaskList component based on the isShow state */}
      {isShow && (
        <TaskList
          tasksList={tasksList}
          onRemoveTask={removeTask}
          onChangeTaskStatus={changeTaskStatus}
          onEditTask={editTask}
          isDarkMode={isDarkMode} // Pass dark mode state to TaskList
        />
      )}
    </div>
  );
};

export default App;
