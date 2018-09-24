import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Router, Route, Link} from "react-router-dom";
import './App.css';
import Othello from "./Othello"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Othello} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
