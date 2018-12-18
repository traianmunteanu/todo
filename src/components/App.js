
import React from 'react';
import moment from 'moment';
import TaskList from './TaskList'
import AddTask from './AddTask'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [
        {
          name: 'Buy Groceries',
          done: false
        },
        {
          name: 'Take the dog out',
          done: false
        },
        {
          name: 'Code a todo list',
          done: false
        },
        {
          name: 'Learn to fly',
          done: false
        },
      ],
      input: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  handleAdd(input) {
    const newTask = {
      name: input,
      done: false
    }
    if (this.state.input.length > 0) {
      this.setState({
        tasks: [ 
          ...this.state.tasks,
          newTask
        ],
        input: ''
      })
    }
  }

  handleKeyPress(e) {
    if(e.key === 'Enter' && this.state.input.length > 0) {
      const newTask = {
        name: this.state.input,
        done: false
      }
      this.setState({
        tasks: [ 
          ...this.state.tasks,
          newTask
        ],
        input: ''
      })
    }
  }

  handleCheckbox(name) {
    const { tasks } = this.state;
    const item = tasks.find(task => task.name === name);
    item.done = !item.done;
    this.setState({
      tasks
    })
  }
  
  handleRemoveItem(task) {
    const { tasks } = this.state;
    const newTasks = tasks.filter(item => item.name !== task.name);
    this.setState({
      tasks: newTasks
    })
  }

  render() {
    return (
      <div className="container" id="todo">
        <h1>{moment().format('dddd, MMM Do YYYY')}</h1>
        <TaskList 
          tasks={this.state.tasks}
          onChecked={this.handleCheckbox}
          onRemoveItem={this.handleRemoveItem}
          />
        <AddTask 
          onAddChange={this.handleChange}
          onAddTask={this.handleAdd}
          onKeyPress={this.handleKeyPress}
          input={this.state.input}
          />
      </div>
    )
  }
}

export default App;