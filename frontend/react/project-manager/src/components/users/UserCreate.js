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
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
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
    axios.post(`http://localhost:8080/api/v1/admin/user/create`
      , {
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      },
      { headers: { Authorization: sessionStorage.getItem('token') } }
    )
      .then(res => {
        this.props.history.push(`/users`);
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
            <span className="input-group-text" id="basic-addon1">User name</span>
          </div>
          <input
            type="text"
            name="username"
            className="form-control "
            placeholder="User name *"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">First name</span>
          </div>
          <input
            type="text"
            name="firstName"
            className="form-control "
            placeholder="First name *"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
        </div>
        
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Last name</span>
          </div>
          <input
            type="text"
            name="lastName"
            className="form-control "
            placeholder="Last name *"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Email</span>
          </div>
          <input
            type="text"
            name="email"
            className="form-control "
            placeholder="Email *"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Password</span>
          </div>
          <input
            type="text"
            name="password"
            className="form-control "
            placeholder="Password *"
            value={this.state.password}
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