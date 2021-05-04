import "./App.css";
import logo from "./logo.png";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./home";
import Covid from "./covid";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="header">
          <div className="header_logo">
            <img src={logo} width="30px" height="30px"></img>
          </div>
          <div className="header_title">WellHealth</div>
          <div className="header_nav">
            <Link to="/wellhealth/" className="header_home">
              Home
            </Link>
            <Link to="/wellhealth/covid" className="header_covid">
              Covid
            </Link>
          </div>
        </div>
        <Switch>
          <Route path="/wellhealth/covid">
            <Covid />
          </Route>
          <Route path="/wellhealth/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
