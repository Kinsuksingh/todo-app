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

  render() {
    const {tasks} = this.state
    return (
      <div className="d-flex flex-column p-5">
        <h1 className="main-heading">Todo List</h1>
        <div className="d-flex flex-column align-items-center w-100">
          <TaskInput onAddTask={this.addTask} />
          <ul className='list-style mt-5 w-100'>
            {tasks.map((task)=> <TaskList key={task.id} taskDetails={task} removeTask={this.removeTask}/>)}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;


