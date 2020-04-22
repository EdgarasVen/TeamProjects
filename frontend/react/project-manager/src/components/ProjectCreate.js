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
      <header className="jumbotron my-4">
        <div className="container register-form">
          <div className="form">
            <div className="note">
              <p> Create new project. </p>
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
                      name="description"
                      className="form-control"
                      placeholder="Description *"
                      value={this.state.description}
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