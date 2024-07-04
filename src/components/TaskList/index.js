import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons';
import './index.css'

const TaskList = (props) => {
    const {tasksList, onRemoveTask, onChangeTaskStatus, onEditTask} = props
    const [isEditingTask, setIsEditingTask] = useState({ id: null, text: '' }); // State for editing
    const handleEditingClick = (taskId, taskText) => {
        setIsEditingTask({id:taskId, text:taskText})
    }
    
    const handleEditChange = (event) => {
        setIsEditingTask((prevState) => ({...prevState, text: event.target.value}))
    }

    const handleSaveTask = (taskId) => {
        onEditTask(taskId, isEditingTask.text)
        setIsEditingTask({id:null, text:''})
    }

    return(
        <ul className='mt-5 list-style w-100'>
            {
                tasksList.map((task) => (
                    <li key={task.id} className='d-flex mb-3'>
                        <input className='input-st' type="checkbox" onClick={()=> onChangeTaskStatus(task.id)}/>
                        <div className='d-flex justify-content-between align-items-center w-100 task-style' >
                            {
                                task.status ? 
                                <p className='mb-0 task'><s>{task.newTask}</s></p> : 
                                <div>
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
                                <button className='custom-btn' disabled={isEditingTask.id===task.id || task.status} onClick={()=> handleEditingClick(task.id, task.newTask)}><FontAwesomeIcon icon={faEdit} /></button>
                                <button className='custom-btn' onClick={() => onRemoveTask(task.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
        
    )
}

export default TaskList