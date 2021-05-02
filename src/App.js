import './App.css';
import logo from "./logo.png"
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import Home from "./home";
import Covid from "./covid";

function App() {
  return (
    <Router>
      <div className="App">
      <div className="header">
        <div className="header_logo"><img src={logo} width="30px" height="30px"></img></div>
        <div className="header_title">WellHealth</div>
        <div className="header_nav">
          <Link to="/" className="header_home">Home</Link>
          <Link to="/covid" className="header_covid">covid</Link>
        </div>
      </div>
        <Switch>
          <Route path="/covid">
            <Covid />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </div>
    </Router>
  );
}



export default App;
