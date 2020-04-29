import React, { Component } from 'react';
import axios from 'axios';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      priority: '',
      status: ''
    }
  }


  Submit = () => {
    axios.put(`http://localhost:8080/api/assign/${this.props.id}`, {
      name: this.state.name,
      priority: this.state.priority,
      status: this.state.status
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.props.history.goBack();
      })

  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    return (
      
        <div className="card-body">
          <div >
            <div className="note">
              <p> Create new task for project {this.props.id}. </p>
            </div>

            <div className="form-content">
              <div className="row">
                <div className="col-md-8">
                <div className="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Name</span>
                  </div>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Task name *"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon2">Priority</span>
                  </div>
                    <select
                      name="priority"
                      className="form-control"
                      value={this.state.priority}
                      onChange={this.handleChange}>
                      <option selected>Choose...</option>
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                    </select>
                  </div>
                  <div className="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">Status</span>
                  </div>
                    <select
                      name="status"
                      className="form-control"
                      value={this.state.status}
                      onChange={this.handleChange}>
                      <option selected>Choose...</option>
                      <option value="WAITING">WAITING</option>
                      <option value="ONGOING">ONGOING</option>
                      <option value="FINISHED">FINISHED</option>
                    </select>
                  </div>

                </div>
              </div>
              <button
                onClick={this.Submit}
                type="button"
                className="btn btn-primary">
                Add task</button>
            </div>
          </div>
        </div>
      
    )
  }

}

export default Header;