import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList'
import './App.css';

class App extends React.Component {
  state = {
    tasks: [],
  };

  addTask = (newTask) => {
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, { id: Date.now(), text: newTask, completed: false }],
    }));
  };

  removeTask = (taskId) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    this.setState({ tasks: updatedTasks });
  };

  toggleTaskStatus = (taskId) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.map((task) => {
      return task.id===taskId? {...task, completed: !task.completed} : task
    });
    this.setState({ tasks: updatedTasks });
  }

  render() {
    const {tasks} = this.state
    return (
      <div className="d-flex flex-column align-items-center p-5">
        <h1 className="main-heading">Todo List</h1>
        <div className="d-flex flex-column align-items-center w-100">
          <TaskInput onAddTask={this.addTask} />
          <ul className='list-style mt-5 w-100'>
            {tasks.map((task)=> <TaskList key={task.id} taskDetails={task} removeTask={this.removeTask} toggleTaskStatus={this.toggleTaskStatus}/>)}
          </ul>
        </div>
        {
        tasks.length>0 && 
        <div className='w-100 btn-section' >
          <button type="button" className="btn btn-success w-25">Save Tasks</button>
        </div>
        }
      </div>
    );
  }
}

export default App;


