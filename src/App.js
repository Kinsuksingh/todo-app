// Import components
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

// Import libraries
import { v4 as uuidV4 } from 'uuid'; // For unique Id generation
import { useState, useEffect } from 'react';    // useState and useEffect hooks for managing state

const App = () => {
  // Function to retrieve stored tasks or add dummy tasks on first load
  const getInitialTasks = () => {
    const storedTodos = JSON.parse(localStorage.getItem("tasksList"));
    const isFirstLoad = localStorage.getItem("firstLoad");

    if (!storedTodos && !isFirstLoad) {
      // Add two dummy tasks if it's the first load
      const dummyTasks = [
        { id: uuidV4(), newTask: "Learn React", status: false },
        { id: uuidV4(), newTask: "Build a Todo App", status: false }
      ];
      localStorage.setItem("tasksList", JSON.stringify(dummyTasks));
      localStorage.setItem("firstLoad", "false"); // Set the first load flag
      return dummyTasks;
    } else {
      return storedTodos !== null ? storedTodos : [];
    }
  };

  // State for tasks list, initialized by getInitialTasks
  const [tasksList, setTasks] = useState(getInitialTasks());

  // State variables for theme and task list visibility
  const [isShow, setIsShow] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // New state for dark mode

  // Function to toggle task list visibility
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

  // Function to change task status by its ID
  const changeTaskStatus = (taskId) => {
    setTasks(tasksList.map((task) => (task.id === taskId ? { ...task, status: !task.status } : task)));
  };

  // Function to edit a task's text
  const editTask = (taskId, updateValue = '') => {
    setTasks(tasksList.map((task) => (task.id === taskId ? { ...task, newTask: updateValue } : task)));
  };

  // Function to save tasks to localStorage
  const handleSaveClick = () => {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  };

  // Save tasks to localStorage when tasksList changes
  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  }, [tasksList]);

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
      height: '100%',
      minHeight: '100vh',
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
        {isDarkMode ? '🔆' : '🌜'}
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
