import { useState } from 'react'; // Import useState hook for managing component state
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for rendering icons
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'; // Import specific icon from FontAwesome
import './index.css'; // Import custom CSS styles for the component

const TaskInput = (props) => {
    // Destructure props object to access the onAddTask function for adding new tasks
    const {onAddTask} = props

    // State variable to store the new task text entered by the user
    const [newTask, createNewTask] = useState('')

    // Function to handle form submission
    const handleSubmit = (event) => {
        // Prevent default form submission behavior
        event.preventDefault()

        // Check if the entered task text has any value after trimming whitespace
        if (newTask.trim()) {
            // Call the onAddTask function
            onAddTask(newTask)
        } else {
            // Alert the user to enter valid text if the input is empty
            alert("Enter Valid Text");
        }

        // Clear the newTask state after successful submission or alert
        createNewTask('')
    }


    return(
        <form className="d-flex flex-column w-100" onSubmit={handleSubmit}>
            {/* Label for the task input field */}
            <label className="label-style" htmlFor="create-task">
                <span className="task-label-text">Create</span> Task
            </label>

             {/* Container for the input field and submit button */}
            <div className='input-section'>
                <input
                    className="inputEle-style"
                    id="create-task"
                    type="text"
                    placeholder="Enter new task"
                    value={newTask}
                    onChange={(e) => createNewTask(e.target.value)}
                />
                {/* Submit button */}
                <button type="submit" className="custom-add-btn">
                     {/* Render PlusSquare icon from FontAwesome */}
                    <FontAwesomeIcon icon={faPlusSquare} />
                </button>
            </div>
        </form>
    )
}

export default TaskInput
