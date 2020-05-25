import React, { Component } from 'react';
import Card from './ProjectCard';
import history from '../login/History';
import AuthenticationService from '../fetch/FetchService';
import {
    Link
} from "react-router-dom";

import axios from 'axios';
import { CSVLink } from 'react-csv';

const API_URL = 'http://localhost:8080';
const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
const isAdminLoggedIn = AuthenticationService.isAdminLoggedIn();

class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            listSize: 0,
            name: '',
            isFetching: false,
            page: 1,
            size: 5,
            headers : [
                { label: "ID", key: "id" },
                { label: "Project name", key: "name" },
                { label: "Description", key: "description" },
                { label: "Task complete", key: "taskCompleted" },
                { label: "Tasks", key: "taskSize" },
                { label: "Complete %", key: "percentage" },
                { label: "Status", key: "status" },
              ]
        }
    }

    componentDidMount() {
        axios.post(`${API_URL}/api/project`,
            {
                pageNumber: this.state.page - 1,
                pageSize: this.state.size
            },
            { headers: { Authorization: sessionStorage.getItem('token') } }
        ).then(res => {
            this.setState({
                projects: res.data.projects.content,
                listSize: res.data.listSize,
                isFetching: true
            })
        })
            .catch(function (error) {
                console.log("--error--" + JSON.stringify(error))
                if (error.status === "undefined" && !isUserLoggedIn) {
                    alert("You are not authorized to access this page");
                    history.push(`/login`)
                    window.location.reload()
                }
                if (error.message === "Request failed with status code 500" && isUserLoggedIn) {
                    alert("Your session time is expired");
                    AuthenticationService.logout();
                    history.push(`/login`)
                    window.location.reload()
                }
            })
    }

    Refresh = (event) => {
        axios.post(`${API_URL}/api/project`,
            {
                pageNumber: this.state.page - 1,
                pageSize: this.state.size
            },
            { headers: { Authorization: sessionStorage.getItem('token') } }
        ).then(res => {
            console.log(res)
            this.setState({
                projects: res.data.projects.content,
                listSize: res.data.listSize,
                isFetching: true
            })
        })
            .catch(function (error) {
                console.log("--error--" + JSON.stringify(error))
                if (error.status === "undefined" && !isUserLoggedIn) {
                    alert("You are not authorized to access this page");
                    history.push(`/login`)
                    window.location.reload()
                }
                if (error.message === "Request failed with status code 500" && isUserLoggedIn) {
                    alert("Your session time is expired");
                    AuthenticationService.logout();
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
        var { projects, isFetching, listSize, headers } = this.state;

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
                                {isAdminLoggedIn && <Link className="btn btn-sm " to="/create">Create new project</Link>}
                                <CSVLink 
                                data={projects}
                                headers={headers}
                                filename={"projects.csv"}
                                className="btn btn-primary btn-sm" >
                                    CSV
                                </CSVLink>
                            </div>
                        </div>
                    </form>

                    <nav aria-label="Page navigation example ">
                        <ul className="pagination justify-content-end ">
                            <div className="mt-1">Pages:{listSize} -</div>
                            <li className="page-item">
                                <input required
                                    type="text"
                                    className="form-control input-sm"
                                    name="page"
                                    size="4"
                                    placeholder="Page #"
                                    value={this.state.page}
                                    onChange={this.handleChange}>
                                </input></li>
                            <div className="mt-1">Size</div>
                            <li className="page-item mr-4">
                                <input required
                                    type="text"
                                    className="form-control input-sm"
                                    name="size"
                                    size="4"
                                    placeholder="Size #"
                                    value={this.state.size}
                                    onChange={this.handleChange}>
                                </input></li>
                            <li className="page-item mr-4">

                                <button className="btn btn-primary btn-sm "
                                    onClick={this.Refresh}>
                                    <span >refresh</span>
                                </button></li>
                        </ul>
                    </nav>

                    <div id="page-content-wrapper">
                        <div className="container-fluid ">

                            <div className="card shadow mb-4">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Project name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Tasks</th>
                                            <th scope="col">Progress</th>
                                            <th scope="col">Status</th>
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