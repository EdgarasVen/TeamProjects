import React, { Component } from 'react';
import Card from './ProjectCard';
import history from './login/History';
import AuthenticationService from './fetch/FetchService';

import axios from 'axios';

const API_URL = 'http://localhost:8080';
const isUserLoggedIn = AuthenticationService.isUserLoggedIn();


class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            name: '',
            isFetching: false
        }
    }

    componentDidMount() {
        axios.get(`${API_URL}/api/project`,
            { headers: { Authorization: sessionStorage.getItem('token') } }
        ).then(res => {
            this.setState({
                projects: res.data,
                isFetching: true
            })
        })
        .catch(function (error) {
            if (error.status==="undefined" && !isUserLoggedIn){
                alert("You are not authorized to access this page");
                history.push(`/login`)
                window.location.reload()
            }
          })
    }


    Submit = (event) => {
        axios.get(`${API_URL}/api/project/search/${this.state.name}`,
        { headers: { Authorization: sessionStorage.getItem('token') } }
        )
            .then(res => {
                this.setState({
                    projects: res.data
                })
            })
            .catch(function (error) {
                if (error.status==="undefined" && !isUserLoggedIn){
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
        var { projects, isFetching } = this.state;
        if (!isFetching) {
            return <div>Loading ....</div>
        }
        else if (projects == null) {
            return <div className="alert alert-warning">Data base fetch problem</div>
        }
        else {
            return (
                <div >
                    <h2>Projects </h2>
                    <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div className="input-group">
                            <input
                                type="text"
                                name="name"
                                className="form-control bg-light border-0 small"
                                placeholder="Search for..."
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                            <div className="input-group-append">
                                <button
                                    onClick={this.Submit}
                                    className="btn btn-primary btn-sm"
                                    type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>


                    <div id="page-content-wrapper">
                        <div className="container-fluid ">

                            <div className="card shadow mb-4">
                                <table className="table ">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Project name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Tasks</th>
                                            <th scope="col">Progress</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.map((pr) =>
                                            <Card
                                                key={pr.id}
                                                id={pr.id}
                                                taskSize={pr.taskSize}
                                                taskCompleted={pr.taskCompleted}
                                                progress={pr.percentage}
                                                name={pr.name}
                                                description={pr.description}
                                                status={pr.status}
                                            />)}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>
            )
        }
    }

}

export default Projects;