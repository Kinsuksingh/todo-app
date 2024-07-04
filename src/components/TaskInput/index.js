import { useState } from 'react'
import './index.css'

const TaskInput = (props) => {
    const {onAddTask} = props
    const [newTask, createNewTask] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        if (newTask.trim()) {
            onAddTask(newTask)
        } else {
            alert("Enter Valid Text");
        }
        createNewTask('')
    }


    return(
        <form className="d-flex flex-column form-style w-100" onSubmit={handleSubmit}>
            <label className="label-style" htmlFor="create-task">
                <span className="st">Create</span> Task
            </label>
            <input
                className="inputEle-style"
                id="create-task"
                type="text"
                placeholder="Enter new task"
                value={newTask}
                onChange={(e) => createNewTask(e.target.value)}
            />
            <button type="submit" className="btn btn-primary w-25">Add Task</button>
        </form>
    )
}

export default TaskInput