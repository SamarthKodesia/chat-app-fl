import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Chatroom from './Chatroom.js';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Login /> */}
        <Routes />
      </div>
    );
  }
}

export default App;
