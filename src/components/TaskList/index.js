import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import './index.css'

const TaskList = (props) => {
    const {taskDetails, removeTask, toggleTaskStatus} = props
    const {id, text, completed} = taskDetails
    const deleteTask = () => {
        removeTask(id)
    }
    const markComplete = () => {
        toggleTaskStatus(id)
    }
    return(
        <li className='d-flex mb-3'>
            <input onClick={markComplete} className='input-st' type="checkbox" />
            <div className='d-flex justify-content-between align-items-center w-100 task-style' >
                {completed ? <p className='mb-0 task'><s>{text}</s></p> : <p className='mb-0 task'>{text}</p>}
                <button className='custom-btn' onClick={deleteTask} ><FontAwesomeIcon icon={faTrashCan} /></button>
            </div>
        </li>
    )
}

export default TaskList
