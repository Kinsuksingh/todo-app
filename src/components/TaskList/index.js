import { useState } from 'react'; // Import the useState hook from React for managing component state
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for rendering icons
import { faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons'; // Import specific icons from FontAwesome
import './index.css'; // Import custom CSS styles for the component

const TaskList = (props) => {
  const { tasksList, onRemoveTask, onChangeTaskStatus, onEditTask, isDarkTheme } = props; // Added isDarkTheme prop for dynamic styling

  const [isEditingTask, setIsEditingTask] = useState({ id: null, text: '' });

  const handleEditingClick = (taskId, taskText) => {
    setIsEditingTask({ id: taskId, text: taskText });
  };

  const handleEditChange = (event) => {
    setIsEditingTask((prevState) => ({ ...prevState, text: event.target.value }));
  };

  const handleSaveTask = (taskId) => {
    onEditTask(taskId, isEditingTask.text);
    setIsEditingTask({ id: null, text: '' });
  };

  return (
    <ul className={`mt-5 list-style w-100 ${isDarkTheme ? 'dark-theme' : ''}`}>
      {tasksList.length > 0 ? (
        <h1 className={`text-center mb-3 todos-heading ${isDarkTheme ? 'dark-text' : ''}`}>Todos</h1>
      ) : (
        <h1 className={`text-center mb-3 todos-heading ${isDarkTheme ? 'dark-text' : ''}`}>Empty Todos</h1>
      )}
      {tasksList.map((task) => (
        <li key={task.id} className="d-flex mb-3">
          <input
            className="checkbox-style"
            type="checkbox"
            checked={task.status}
            onClick={() => onChangeTaskStatus(task.id)}
          />
          <div
            className={`d-flex justify-content-between align-items-center w-100 task-style ${
              isDarkTheme ? 'dark-task-bg' : ''
            }`}
          >
            {task.status ? (
              <p className="mb-0 task">
                <s>{task.newTask}</s>
              </p>
            ) : (
              <div>
                {isEditingTask.id === task.id ? (
                  <input
                    className="edit-input"
                    type="text"
                    value={isEditingTask.text}
                    onChange={handleEditChange}
                    onBlur={() => handleSaveTask(task.id)} // Save on blur
                  />
                ) : (
                  <p id="editing" className="mb-0 task">
                    {task.newTask}
                  </p>
                )}
              </div>
            )}
            <div>
              <button
                type="button"
                className="custom-edit-btn"
                disabled={isEditingTask.id === task.id || task.status}
                onClick={() => handleEditingClick(task.id, task.newTask)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                type="button"
                className="custom-delete-btn"
                onClick={() => onRemoveTask(task.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
