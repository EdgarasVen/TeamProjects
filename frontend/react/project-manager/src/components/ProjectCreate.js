import React, { Component } from 'react';
import axios from 'axios';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      status: ''
    }
  }


  Submit = () => {
    axios.post(`http://localhost:8080/api/project`, {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.props.history.push(`/projects`);
      })

  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    return (
      <div className="card-body col-12 col-md-8">
        <div >
          <div className="note">
            <p> Create new project. </p>
          </div>

          <div >
            <div >
              <label >
                <div className="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Name</span>
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
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon2">Description</span>
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
                    <option value="INPROGRESS">INPROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

              </label>
            </div>
            <button
              onClick={this.Submit}
              type="button"
              className="btn btn-primary">
              Submit</button>
          </div>
        </div>
      </div>
    )
  }

}

export default Header;