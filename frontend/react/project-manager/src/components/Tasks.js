import React, { Component } from 'react';
import Card from './TaskCard';
import history from './login/History';
import AuthenticationService from './fetch/FetchService';

import axios from 'axios';

const API_URL = 'http://localhost:8080';
const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            name: '',
            isFetching: false
        }
    }

    componentDidMount() {
        
        console.log(AuthenticationService.isAdminLoggedIn())
        axios
            .get(`${API_URL}/api/task`,
            { headers: { Authorization: sessionStorage.getItem('token') } }
            )
            .then(res => {
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

    componentDidUpdate() {
        axios
            .get(`${API_URL}/api/task`,
            { headers: { Authorization: sessionStorage.getItem('token') } }
            )
            .then(res => {
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
        event.preventDefault();

        axios.get(`${API_URL}/api/project/name/${this.state.name}`,
        { headers: { Authorization: sessionStorage.getItem('token') } }
        )
            .then(res => {
                this.setState({ projects: res.data })
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
        axios.get(`${API_URL}/api/task/search/${this.state.name}`,
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
                        </div>
                    </div>

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