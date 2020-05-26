import React, { Component } from 'react';
import Card from './UserCard';
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
            users: [],
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
    componentDidUpdate(prevProps, prevState) {
        if (this.state.users !==
            prevState.users) {
            this.fetch();
        }
    }

    fetch(){
        axios.get(`${API_URL}/api/v1/admin/users`,
        { headers: { Authorization: sessionStorage.getItem('token') } }
    ).then(res => {
        console.log(res)
        this.setState({
            users: res.data,
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

    componentDidMount() {
        if (!isAdminLoggedIn) {
            alert("You are not authorized to access this page");
            history.push("/login");
            window.location.reload();
          }
        this.fetch();  
        
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
        var { users, isFetching, listSize, headers } = this.state;

        if (!isFetching) {
            return <div>Loading ....</div>
        }
        else if (users == null) {
            return <div className="alert alert-warning">Data base fetch problem</div>
        }
        else {
            return (
                <div >
                    <h2>Users </h2>
                    <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div className="input-group">
                            
                            <div className="input-group-append">
                                <button
                                    onClick={this.Submit}
                                    className="btn btn-primary btn-sm"
                                    type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                                {isAdminLoggedIn && <Link className="btn btn-sm " to="/user/create">Create new user</Link>}
                                <CSVLink 
                                data={users}
                                headers={headers}
                                filename={"users.csv"}
                                className="btn btn-primary btn-sm" >
                                    CSV
                                </CSVLink>
                            </div>
                        </div>
                    </form>

                    <div id="page-content-wrapper">
                        <div className="container-fluid ">

                            <div className="card shadow mb-4">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">user name</th>
                                            <th scope="col">First name</th>
                                            <th scope="col">Last name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Date created</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) =>
                                            <Card    
                                                id={user.id}
                                                data={user.created.slice(0,10)}
                                                name={user.username}
                                                firstName={user.firstName}
                                                lastName={user.lastName}
                                                email={user.email}
                                                
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