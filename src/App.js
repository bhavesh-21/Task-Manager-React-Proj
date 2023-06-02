import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskCreate from "./components/TaskCreate";
import "./App.css";
import './bootstrap.min.css';
class App extends Component {
  render() {
    
    const bodyStyle = {
      background: 'linear-gradient(to left, #32AFA9 30%, #E4E9FD 90%)',
      minHeight: '100vh',
    };
    
    return (
      <Router>
        <div style={bodyStyle}>
          
          <Routes>
            <Route exact path="/" element={<TaskList/>} />
            <Route exact path="/create" element={<TaskCreate/>} />
            <Route path="/edit/:id" element={<TaskCreate/>} />
          </Routes>
        </div>

        
      </Router>

    );
  }
}

export default App;
