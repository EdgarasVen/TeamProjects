import React, { Component } from 'react';
import axios from 'axios';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      priority: '',
      status: '',
      description: '',
      isFetching: false
    }
  }


  Submit = () => {
    axios.put(`http://localhost:8080/api/task/${this.props.id}`, {
      name: this.state.name,
      priority: this.state.priority,
      status: this.state.status,
      description: this.state.description
    })
      .then(res => {
        console.log("---"+"");
        this.props.history.goBack();
      })

  }

  componentDidMount() {
    axios
      .get(`http://localhost:8080/api/task/id/${this.props.id}`)
      .then(res => {
        console.log("---"+"");
        this.setState({
          name: res.data.name,
          priority: res.data.priority,
          status: res.data.status,
          description: res.data.description,
          isFetching: true,
        })       
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
          UPDATE</button>

      </div>
    )
  }

}

export default Header;