import React, { Component } from 'react';
import axios from 'axios';
import history from './login/History';
import AuthenticationService from './fetch/FetchService';

const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
const isAdminLoggedIn = AuthenticationService.isAdminLoggedIn();

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      priority: '',
      status: '',
      description: ''
    }
  }

  componentDidMount() {
    if (!isAdminLoggedIn) {
      alert("You are not authorized to access this page");
      history.push("/login");
      window.location.reload();
    }
  }

  Submit = () => {
    axios.put(`http://localhost:8080/api/v1/admin/assign/${this.props.id}`
      , {
        name: this.state.name,
        priority: this.state.priority,
        status: this.state.status,
        description: this.state.description
      },
      { headers: { Authorization: sessionStorage.getItem('token') } }
    )
      .then(res => {
        this.props.history.goBack();
      })
      .catch(function (error) {
        if (error.status === "undefined" && !isUserLoggedIn) {
          alert("You are not authorized to access this page");
          history.push(`/login`)
          window.location.reload()
        }
      })
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    return (
      <div className="row justify-content-center ml-3 mr-3 mt-3">

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Name</span>
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
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon2">Priority</span>
          </div>
          <select
            name="priority"
            className="form-control"
            value={this.state.priority}
            onChange={this.handleChange}>
            <option >Choose...</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3">Status</span>
          </div>
          <select
            name="status"
            className="form-control"
            value={this.state.status}
            onChange={this.handleChange}>
            <option >Choose...</option>
            <option value="WAITING">WAITING</option>
            <option value="ONGOING">ONGOING</option>
            <option value="FINISHED">FINISHED</option>
          </select>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon2">Description</span>
          </div>
          <textarea
            type="text"
            name="description"
            className="form-control "
            placeholder="Description *"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <button
          onClick={this.Submit}
          type="button"
          className="btn btn-primary">
          Add task</button>

      </div>
    )
  }

}

export default Header;