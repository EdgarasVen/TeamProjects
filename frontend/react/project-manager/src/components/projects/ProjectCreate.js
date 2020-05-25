import React, { Component } from 'react';
import axios from 'axios';
import AuthenticationService from '../fetch/FetchService';
import history from '../login/History';

const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
const isAdminLoggedIn = AuthenticationService.isAdminLoggedIn();

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      status: ''
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
    axios.post(`http://localhost:8080/api/v1/admin/project`
      , {
        name: this.state.name,
        description: this.state.description,
        status: "WAITING"
      },
      { headers: { Authorization: sessionStorage.getItem('token') } }
    )
      .then(res => {
        this.props.history.push(`/projects`);
      })
      .catch(function (error) {
        console.log(error.status)
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
            className="form-control "
            placeholder="Project name *"
            value={this.state.name}
            onChange={this.handleChange}
          />
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
          Submit</button>

      </div>
    )
  }

}

export default Header;