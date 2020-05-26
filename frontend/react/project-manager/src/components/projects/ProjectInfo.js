import React, { Component } from 'react';
import Card from "../tasks/TaskCard";
import axios from 'axios';
import {
    Link
} from "react-router-dom";
import history from '../login/History';
import AuthenticationService from '../fetch/FetchService';

const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
const isAdminLoggedIn = AuthenticationService.isAdminLoggedIn();

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: [],
            taskWaiting: [],
            fetchWaiting: false,
            taskOngoing: [],
            fetchOngoing: false,
            taskFinished: [],
            fetchFinished: false,
            isFetching: false,

        }
    }

    errorCheck(error) {
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
    }

    fetchWaiting() {
        axios
            .get(`http://localhost:8080/api/task/waiting/${this.props.id}`,
                { headers: { Authorization: sessionStorage.getItem('token') } }
            )
            .then(res => {
                
                this.setState({
                    taskWaiting: res.data,
                    fetchWaiting: true,
                })
            })
            .catch(function (error) {
                this.errorCheck(error);
            })
    }
    fetchOngoing() {
        axios
            .get(`http://localhost:8080/api/task/ongoing/${this.props.id}`,
                { headers: { Authorization: sessionStorage.getItem('token') } }
            )
            .then(res => {
                
                this.setState({
                    taskOngoing: res.data,
                    fetchOngoing: true,
                })
            })
            .catch(function (error) {
                this.errorCheck(error);
            })
    }
    fetchFinished() {
        axios
            .get(`http://localhost:8080/api/task/finished/${this.props.id}`,
                { headers: { Authorization: sessionStorage.getItem('token') } }
            )
            .then(res => {
                
                this.setState({
                    taskFinished: res.data,
                    fetchFinished: true,
                })
            })
            .catch(function (error) {
                this.errorCheck(error);
            })
    }

    fetch() {
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
                this.errorCheck(error);
            })
    }

    componentDidMount() {
        this.fetch();
        this.fetchWaiting();
        this.fetchOngoing();
        this.fetchFinished();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.project !==
            prevState.project) {
            this.fetch();
        }
        if (this.state.taskWaiting !==
            prevState.taskWaiting) {
            this.fetchWaiting();
        }
        if (this.state.taskOngoing !==
            prevState.taskOngoing) {
            this.fetchOngoing();
        }
        if (this.state.taskFinished !==
            prevState.taskFinished) {
            this.fetchFinished();
        }
    }

    submit =() => {
        axios.delete(`http://localhost:8080/api/v1/admin/project/${this.props.id}`,
            { headers: { Authorization: sessionStorage.getItem('token') } }
        )
            .then(res => {
                this.props.history.push(`/projects`);
            })
            .catch(function (error) {
                this.errorCheck(error);
            })
    }

    changeStatus = (id, name, priority, description, status) => {
        axios.put(`http://localhost:8080/api/task/${id}`
            , {
                name: name,
                priority: priority,
                status: status,
                description: description
            },
            { headers: { Authorization: sessionStorage.getItem('token') } }
        )
            .then(res => {

            })
            .catch(function (error) {
                this.errorCheck(error);
            })

    }


    render() {
        var { isFetching, project, taskFinished, taskOngoing, taskWaiting,
            fetchWaiting, fetchOngoing, fetchFinished } = this.state;
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


                                {isAdminLoggedIn && <div>
                                    <Link className="btn btn-outline-info btn-sm" to={`/project/edit/${project.id}`}>Edit</Link>
                                    <Link className="btn btn-outline-info btn-sm" to={`/project/add/${project.id}`}>Add Task</Link>
                                    <button
                                        onClick={() =>this.submit()}
                                        type="button"
                                        className="btn btn-outline-danger btn-sm">
                                        Delete Project</button>
                                </div>}

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

                            <div className="row mt-3">
                                <div className="col-sm">
                                    <p className="bg-info text-white">Waiting</p>
                                    {fetchWaiting &&
                                        <div>
                                            {taskWaiting.map((task) =>
                                                <div className="row ">
                                                    <div className="col-sm">

                                                    </div>
                                                    <div className="col-sm pt-2">
                                                        {task.name}
                                                    </div>
                                                    <div className="col-sm">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={() => this.changeStatus(task.id, task.name, task.priority, task.description, "ONGOING")}
                                                        >&#62;</button>
                                                    </div>
                                                </div>

                                            )}
                                        </div>}

                                </div>
                                <div className="col-sm">
                                    <p className="bg-primary text-white">Ongoing</p>
                                    {fetchOngoing &&
                                        <div>
                                            {taskOngoing.map((task) =>
                                                <div className="row">
                                                    <div className="col-sm">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary btn-sm "
                                                            onClick={() => this.changeStatus(task.id, task.name, task.priority, task.description, "WAITING")}>&#60;</button>
                                                    </div>
                                                    <div className="col-sm pt-2 ">
                                                        {task.name}
                                                    </div>
                                                    <div className="col-sm ">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary btn-sm "
                                                            onClick={() => this.changeStatus(task.id, task.name, task.priority, task.description, "FINISHED")}>&#62;</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>}
                                </div>
                                <div className="col-sm">
                                    <p className="bg-success text-white">Finished</p>
                                    {fetchFinished &&
                                        <div>
                                            {taskFinished.map((task) =>
                                                <div className="row">
                                                    <div className="col-sm">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={() => this.changeStatus(task.id, task.name, task.priority, task.description, "ONGOING")}
                                                        >&#60;</button>
                                                    </div>
                                                    <div className="col-sm pt-2">
                                                        {task.name}
                                                    </div>
                                                    <div className="col-sm">

                                                    </div>
                                                </div>
                                            )}
                                        </div>}
                                </div>
                            </div>
                        </div>

                    </div>



                </div>
            );
        }
    }
}

export default Project;