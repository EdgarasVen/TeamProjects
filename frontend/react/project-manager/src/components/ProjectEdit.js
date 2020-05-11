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
      description: '',
      status: '',
      isFetching: false
    }
  }

  componentDidMount() {
    if (!isAdminLoggedIn) {
      alert("You are not authorized to access this page");
      history.push("/login");
      window.location.reload();
    }

    axios
      .get(`http://localhost:8080/api/project/id/${this.props.id}`,
        { headers: { Authorization: sessionStorage.getItem('token') } }
      )
      .then(res => {
        this.setState({
          name: res.data.name,
          description: res.data.description,
          status: res.data.status,
          isFetching: true,
        })
      })
      .catch(function (error) {
        if (error.status === "undefined" && !isUserLoggedIn) {
          alert("You are not authorized to access this page");
          history.push(`/login`)
          window.location.reload()
        }
        if(error.message==="Request failed with status code 500" && isUserLoggedIn){
          alert("Your session time is expired");
          AuthenticationService.logout();
          history.push(`/login`)
          window.location.reload()
      }
      })
  }

  Submit = () => {
    axios.put(`http://localhost:8080/api/v1/admin/project/${this.props.id}`
      , {
        name: this.state.name,
        description: this.state.description,
        status: this.state.status
      },
      { headers: { Authorization: sessionStorage.getItem('token') } })
      .then(res => {
        this.props.history.push(`/projects`);
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
                 status
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3">Status</span>
          </div>
          <select
            name="status"
            className="form-control"
            value={this.state.status}
            onChange={this.handleChange}
          >
            <option value="INPROGRESS">INPROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>

        <button
          onClick={this.Submit}
          type="button"
          className="btn btn-primary">
          UPDATE</button>

      </div>
    )
  }

}

export default Header;