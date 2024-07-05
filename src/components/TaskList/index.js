import { useState } from 'react';  // Import the useState hook from React for managing component state
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Import FontAwesomeIcon for rendering icons
import { faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons';  // Import specific icons from FontAwesome
import './index.css' ; // Import custom CSS styles for the component

const TaskList = (props) => {
    // Destructure props object to access tasksList, onRemoveTask, onChangeTaskStatus, and onEditTask functions passed from parent component
    const {tasksList, onRemoveTask, onChangeTaskStatus, onEditTask} = props
    
    // State for editing a task. Stores the task ID and its current text.
    const [isEditingTask, setIsEditingTask] = useState({ id: null, text: '' });
    
    // Function to  handle clicking the edit button for a task
    const handleEditingClick = (taskId, taskText) => {
        // Updating the isEditingTask state with the clicked task's ID and text
        setIsEditingTask({id:taskId, text:taskText})
    }
    
    // Function to handle changes in the edit input field
    const handleEditChange = (event) => {
        // Updating the isEditingTask state with the new value from the input field
        setIsEditingTask((prevState) => ({...prevState, text: event.target.value}))
    }
    
    // Function to handle saving the edited task
    const handleSaveTask = (taskId) => {
        // Call the onEditTask function passed from the parent component, passing the task ID and the edited text
        onEditTask(taskId, isEditingTask.text)
        // Reset the isEditingTask state to clear the editing view
        setIsEditingTask({id:null, text:''})
    }

    return(
        <ul className='mt-5 list-style w-100'>
            {/* Render heading  based on whether there are tasks */}
            {tasksList.length>0 ? <h1 className='text-center mb-3 todos-heading'>Todos</h1> : <h1 className='text-center mb-3 todos-heading'>Empty Todos</h1>}

            {/* Loop through the tasks list and render each task as a list item */}
            {
                tasksList.map((task) => (
                    <li key={task.id} className='d-flex mb-3'>
                        <input className='checkbox-style' type="checkbox" checked={task.status} onClick={()=> onChangeTaskStatus(task.id)}/>
                        <div className='d-flex justify-content-between align-items-center w-100 task-style' >
                            {/* Conditionally display task text based on its status (completed or not) */}
                            {
                                task.status ? 
                                <p className='mb-0 task'><s>{task.newTask}</s></p> : 
                                <div>
                                {/* Conditionally render edit input or task text based on editing state  */}
                                    {
                                        isEditingTask.id===task.id ? 
                                        <input 
                                            className='edit-input'
                                            type="text"
                                            value={isEditingTask.text}
                                            onChange={handleEditChange}
                                            onBlur={() => handleSaveTask(task.id)} // Save on blur
                                        /> : 
                                        <p id='editing' className='mb-0 task'>{task.newTask}</p>
                                    }
                                </div>
                            }
                            <div>
                                {/* Button container for Edit and Delete Task */}
                                <button type='button' className='custom-edit-btn' disabled={isEditingTask.id===task.id || task.status} onClick={()=> handleEditingClick(task.id, task.newTask)}><FontAwesomeIcon icon={faEdit} /></button>
                                <button type='button' className='custom-delete-btn' onClick={() => onRemoveTask(task.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
        
    )
}

export default TaskList