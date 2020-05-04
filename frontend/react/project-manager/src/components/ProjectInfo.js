import React, { Component } from 'react';
import Card from "./TaskCard";
import axios from 'axios';
import {
    Link
} from "react-router-dom";


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
            .get(`http://localhost:8080/api/project/id/${this.props.id}`)
            .then(res => {
                this.setState({
                    project: res.data,
                    isFetching: true,
                })
            })
    }

    componentDidUpdate() {
        axios
            .get(`http://localhost:8080/api/project/id/${this.props.id}`)
            .then(res => {
                this.setState({
                    project: res.data,
                    isFetching: true,
                })
            })
    }

    Submit = () => {
        axios.delete(`http://localhost:8080/api/project/${this.props.id}`)
            .then(res => {
                console.log("---" + "");
                this.props.history.push(`/projects`);
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
                                <p className="card-text" key="3">Tasks completed : {project.taskCompleted}</p>
                                <p className="card-text" key="3">Tasks count : {project.taskSize}</p>

                                

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