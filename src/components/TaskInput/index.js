import { useState } from 'react'; // Import useState hook for managing component state
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for rendering icons
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'; // Import specific icon from FontAwesome
import './index.css'; // Import custom CSS styles for the component

const TaskInput = (props) => {
  const { onAddTask, isDarkMode } = props;
  const [newTask, createNewTask] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newTask.trim()) {
      onAddTask(newTask);
    } else {
      alert("Enter Valid Text");
    }

    createNewTask('');
  };

  return (
    <form className="d-flex flex-column w-100" onSubmit={handleSubmit}>
      <label className={`label-style ${isDarkMode ? 'dark-label' : ''}`} htmlFor="create-task">
        <span className="task-label-text">Create</span> Task
      </label>

      <div className={`input-section ${isDarkMode ? 'dark-input-section' : ''}`}>
        <input
          className={`inputEle-style ${isDarkMode ? 'dark-inputEle-style' : ''}`}
          id="create-task"
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => createNewTask(e.target.value)}
        />
        <button type="submit" className="custom-add-btn">
          <FontAwesomeIcon icon={faPlusSquare} />
        </button>
      </div>
    </form>
  );
};

export default TaskInput;
