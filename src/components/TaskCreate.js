import withRouter from './withRouter';
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css'
// import { useP a rams } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
const x = "https://k-ocf6.onrender.com";





class TaskCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      text:"Create Task"
    };
  }

  componentDidMount() { 
    if(this.props.params.id){
      this.fetchTasks();
    }
  }

  fetchTasks = () => {
    axios.get(x+'/tasks/'+this.props.params.id)
      .then(response => {
        const {title, description } = response.data;
        console.log(response.data);
        this.setState({
          title: title,
          description:description,
          text:"Edit Task"
        });
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }
  
  
  handleSubmit = (e) => {
    e.preventDefault();
    
    const { title, description } = this.state;
    
    // Perform form validation
    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter a title and description");
      return;
    }
    if (this.state.text === "Edit Task") {
      
      axios
        .put(x + "/tasks/"+this.props.params.id, { title, description })
        .then((response) => {
          alert("Task Updated successfully");
          this.props.navigate("/");
        })
        .catch((error) => {
          console.error("Error Updating task:", error);
        });
    }
    else {
      
      axios
        .post(x + "/tasks", { title, description })
        .then((response) => {
          alert("Task created successfully");
          this.props.navigate("/");
        })
        .catch((error) => {
          console.error("Error creating task:", error);
        });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { title, description,text } = this.state;
    return (
      <div>
      <div>
        <br/> 
        <div className="d-flex justify-content-center">
          <h2 className="col-lg-9 col-md-9" style={{marginLeft: 10, marginBottom: 20}}>{text}</h2>
        </div> 
        <div className="container-flex d-flex justify-content-center">
          <div className="shadow p-3 col-11 mb-5 col-md-9  bg-body rounded">
              <form id="app" method="post"  onSubmit={this.handleSubmit}>
              <Link to="/">

                <div className="btn btn-outline-secondary btn-sm" style={{margin: 0}}>
                  <img src="/back.svg" width="24"/> Back to Task List</div>
              </Link>
               
                 <br/>
                 <br/>
                  <h5 className="inline pb-2 form-title">Title</h5> 
                <input type="text"
                placeholder="Title..."
              name="title"
              value={title}
              onChange={this.handleChange} className="form-control form-control-lg"/>  
                 <h5 className="form-title mt-3">Description </h5> 
                <textarea placeholder="Write Task here ..." rows="3" className="mb-3 form-control form-control-lg"
                  name="description"
              value={description}
              onChange={this.handleChange}></textarea>
                  <button type="submit" className="btn btn-success " style={{width:"100%"}}>{text}</button>
              </form>
          </div>
        </div>
      </div>


      </div>
    );
  }
}

export default  withRouter(TaskCreate);
