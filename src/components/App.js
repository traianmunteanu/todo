
import React from 'react'
import moment from 'moment'
import TaskList from './TaskList'
import AddTask from './AddTask'
import Registration from './Registration'
import firebase from 'firebase'
import base, { firebaseApp } from '../base'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [
      ],
      input: '',
      loggedIn: false,
      uid: null,
      owner: null,

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.ref = base.syncState('tasks', {
      context: this,
      state: 'tasks',
      asArray: true
    })
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({ user });
      }
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  authHandler = async (authData) => {
    const store = await base.fetch('tasks', { context: this });
    if (!store.owner) {
      await base.post(`tasks/owner`, {
        data: authData.user.uid
      })
    }
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
      loggedIn: true
    })
  }

  authenticate = (provider) => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword()
      .then(this.authHandler);
  }

  logout = async () => {
    console.log('logging out!');
    await firebase.auth().signOut();
    this.setState({
      uid: null,
    })
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
    if(!this.state.loggedIn) {
      return <Registration isLoggedIn={this.state.loggedIn} />
    }
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