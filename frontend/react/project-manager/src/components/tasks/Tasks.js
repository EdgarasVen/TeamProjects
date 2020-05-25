import React, { Component } from 'react';
import Card from './TaskCard';
import history from '../login/History';
import AuthenticationService from '../fetch/FetchService';

import {CSVLink} from 'react-csv';

import axios from 'axios';

const API_URL = 'http://localhost:8080';
const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            name: '',
            isFetching: false,
            page: 1,
            size: 5,
            listSize: 0,
            headers : [
                { label: "ID", key: "id" },
                { label: "Task name", key: "name" },
                { label: "Description", key: "description" },
                { label: "Priority", key: "priority" },
                { label: "Status", key: "status" },
                { label: "Create date", key: "date" },
                { label: "Assign to project", key: "projectN" },
              ]
        }
    }

    componentDidMount() {
        axios
            .post(`${API_URL}/api/task`,
                {
                    pageNumber: this.state.page-1,
                    pageSize: this.state.size
                },
                { headers: { Authorization: sessionStorage.getItem('token') } }
            )
            .then(res => {
                console.log(res)
                this.setState({
                    projects: res.data.tasks.content,
                    listSize: res.data.listSize,
                    isFetching: true
                })
            })
            .catch(function (error) {
                console.log("--error--" + error)
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
        axios.get(`${API_URL}/api/task/search/${this.state.name}`,
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

    Refresh = (event) => {
        axios
            .post(`${API_URL}/api/task`,
                {
                    pageNumber: this.state.page-1,
                    pageSize: this.state.size
                },
                { headers: { Authorization: sessionStorage.getItem('token') } }
            )
            .then(res => {
                this.setState({
                    projects: res.data.tasks.content,
                    listSize: res.data.listSize,
                    isFetching: true
                })
            })
            .catch(function (error) {
                console.log("--error--" + error)
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

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    render() {
        var { projects, isFetching, listSize,headers } = this.state;
        if (!isFetching) {
            return <div>Loading ....</div>
        }
        else {
            return (
                <div >
                    <h2>Tasks</h2>
                    <div className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
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
                            <CSVLink 
                                data={projects}
                                headers={headers}
                                filename={"tasks.csv"}
                                className="btn btn-primary btn-sm" >
                                    CSV
                                </CSVLink>
                        </div>
                    </div>

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
                                            <th scope="col">Task name</th>
                                            <th scope="col">Priority</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.map((pr) =>
                                            <Card
                                                key={pr.id}
                                                id={pr.id}
                                                name={pr.name}
                                                description={pr.description}
                                                priority={pr.priority}
                                                status={pr.status}
                                                date={pr.date}
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

export default Tasks;