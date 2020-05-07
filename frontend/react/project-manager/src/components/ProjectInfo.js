import React, { Component } from 'react';
import Card from "./TaskCard";
import axios from 'axios';
import {
    Link
} from "react-router-dom";
import history from './login/History';
import AuthenticationService from './fetch/FetchService';
const isUserLoggedIn = AuthenticationService.isUserLoggedIn();


class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: {},
            isFetching: false,
        }
    }

    componentDidMount() {
        axios
            .get(`http://localhost:8080/api/project/id/${this.props.id}`,
            { headers: { Authorization: sessionStorage.getItem('token') } }
            )
            .then(res => {
                this.setState({
                    project: res.data,
                    isFetching: true,
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
            .get(`http://localhost:8080/api/project/id/${this.props.id}`,
            { headers: { Authorization: sessionStorage.getItem('token') } }
            )
            .then(res => {
                this.setState({
                    project: res.data,
                    isFetching: true,
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

    Submit = () => {
        axios.delete(`http://localhost:8080/api/project/${this.props.id}`,
        { headers: { Authorization: sessionStorage.getItem('token') } }
        )
            .then(res => {
                this.props.history.push(`/projects`);
            })
            .catch(function (error) {
                if (error.status==="undefined" && !isUserLoggedIn){
                    alert("You are not authorized to access this page");
                    history.push(`/login`)
                    window.location.reload()
                }
              })
    }

    render() {
        var { isFetching, project } = this.state;
        if (!isFetching) {
            return <div>Loading ....</div>
        }
        else {
            return (
                <div >

                    <div >
                        <div className="card-body">
                            <div className=" justify-content-center ">
                                <p className="card-text " key="1">Name : {project.name}</p>
                                <p className="card-text" key="2">Description : {project.description}</p>
                                <p className="card-text" key="3">Status : {project.status}</p>
                                <p className="card-text" key="4">Tasks completed : {project.taskCompleted}</p>
                                <p className="card-text" key="5">Tasks count : {project.taskSize}</p>

                                

                                <Link className="btn btn-outline-info btn-sm" to={`/project/edit/${project.id}`}>Edit</Link>
                                <Link className="btn btn-outline-info btn-sm" to={`/project/add/${project.id}`}>Add Task</Link>
                                <button
                                    onClick={this.Submit}
                                    type="button"
                                    className="btn btn-outline-danger btn-sm">
                                    Delete Project</button>
                            </div>
                            <div >
                                <table className="table ">
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
                                        {project.tasks.map((pr) =>
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
            );
        }
    }
}

export default Project;