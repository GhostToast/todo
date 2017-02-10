import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    var Button = require('react-button');
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To-do app.
        </p>
        <ul class="todo-items">
          <li>Create a todo item</li>
        </ul>
        
        <Button color='blue'>Add New Item</Button>
        
      </div>
    );
  }
}

export default App;
