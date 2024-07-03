import {Component} from 'react';
import './index.css'; // Import your custom CSS file (optional)

class TaskInput extends Component {
    state = {
        newTask: '',
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { newTask } = this.state;
        const { onAddTask } = this.props;
        if (newTask.trim()) {
            onAddTask(newTask);
            this.setState({ newTask: '' });
        } else {
            alert("Enter Valid Text");
        }
    };

    render() {
        const { newTask } = this.state;
        return (
            <form className="d-flex flex-column form-style w-100" onSubmit={this.handleSubmit}>
                <label className="label-style" htmlFor="create-task">
                    <span className="st">Create</span> Task
                </label>
                <input
                    className="inputEle-style"
                    id="create-task"
                    type="text"
                    placeholder="Enter new task"
                    value={newTask}
                    onChange={(e) => this.setState({ newTask: e.target.value })}
                />
                <button type="submit" className="btn btn-primary w-25">Add Task</button>
            </form>
        );
    }
}

export default TaskInput;
