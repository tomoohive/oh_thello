import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Othello from "./Othello";
import About from "./About";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title">Oh-thello</div>
        </header>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={About} />
            <Route exact path="/othello" component={Othello} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
