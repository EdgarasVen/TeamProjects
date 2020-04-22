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
      })

  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    return (
      <header className="jumbotron my-4">
        <div className="container register-form">
          <div className="form">
            <div className="note">
              <p> Create new task for project {this.props.id}. </p>
            </div>

            <div className="form-content">
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Project name *"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="priority"
                      className="form-control"
                      placeholder="Priority *"
                      value={this.state.priority}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="status"
                      className="form-control"
                      placeholder="Status *"
                      value={this.state.status}
                      onChange={this.handleChange}
                    />
                  </div>

                </div>
              </div>
              <button
                onClick={this.Submit}
                type="button"
                className="btn btn-primary">
                Add this project</button>
            </div>
          </div>
        </div>
      </header>
    )
  }

}

export default Header;