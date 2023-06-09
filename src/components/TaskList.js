import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const x="https://k-qaqx.onrender.com"
class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    axios.get(x+'/tasks')
      .then(response => {
        this.setState({ tasks: response.data });
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }

    markTaskAsCompleted = (taskId,check) => {
    axios.patch(x+`/tasks/${taskId}`, { completed: !check })
      .then(response => {
        console.log('Task marked as completed:', response.data);
        this.fetchTasks();
      })
      
      .catch(error => {
        console.error('Error marking task as completed:', error);
      });
  }

  deleteTask = (taskId) => {
    axios.delete(x+`/tasks/${taskId}`)
      .then(response => {
        console.log('Task deleted:', response.data);
        this.fetchTasks();
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  }

  render() {
      const { tasks } = this.state;
      let t=[]
      if (tasks.length <= 0) {
        t=(<span>No Task Add a Task </span>)
      }
    
    else{
        t = tasks.map(task => (
          <div key={task._id} className="container-flex d-flex justify-content-center mb-2">
          <div className="row shadow p-3 col-12  bg-body rounded" >

            <div className="container">
              <h3>{task.title}</h3>
                <p>{task.description}</p>
                </div>
            <div className="row">
            <div className="col-6">

              <div className=" forn-check">
                <input
                  type="checkbox"
                  id={"check"+task._id}
                  className="form-check-input"
                  checked={task.completed}
                  onChange={() => this.markTaskAsCompleted(task._id,task.completed)}
                    />
                    <label className="form-check-label" htmlFor={"check"+task._id}>
                Mark as Completed
                      </label>
              </div>
              </div>

              <div className="col-6 d-flex justify-content-end">
                <Link className="btn btn-primary" to={`/edit/${task._id}`}>Edit</Link>
                <button className="btn btn-danger" style={{marginLeft: 5}}  onClick={() => this.deleteTask(task._id)}>Delete</button>
              </div>

            </div>
            </div>
            </div>
            
          ))
    }

    return (
      <div>
        <br/>
      <div className="d-flex justify-content-center">
          <h2 className="col-lg-9 col-md-9 bold" style={{marginLeft: 10, marginBottom: 20}}>Task List</h2>
        </div> 
        <div className="container-flex d-flex justify-content-center">
          <div className="shadow p-3 col-11 mb-5 col-md-9  bg-body rounded">


        

  
 
  <div>
        {t}
                
              </div>

            
        <Link to="/create"><a className="btn btn-lg btn-success" style={{width:"100%"}}>+ Add Task</a></Link>
            
            </div>

            </div>
      </div>
    );
  }
}

export default TaskList;
