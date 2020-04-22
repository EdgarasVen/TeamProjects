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
            projects: []
        }
    }

    componentDidMount() {
        axios
            .get(`http://localhost:8080/api/project/${this.props.name}`)
            .then(res => {
                this.setState({ projects: res.data })
            })
    }

    render() {
        var { projects } = this.state;
        return (
            <div >
                {/* Page Heading */}
                <div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <h1 className="h3 mb-0 text-gray-800">{this.props.name}</h1>

                    <Link to={`/project/edit/${this.props.name}`} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-4">
                        <i className="fas  fa-sm text-white-50"></i> Edit </Link>
                    <Link to="" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-4">
                        <i className="fas  fa-sm text-white-50"></i> Delete </Link>
                </div>
                {projects.map((item, i) =>
                    <div>
                        <div className="card-body">
                            <p className="card-text " key="1">Name : {item.name}</p>
                            <p className="card-text" key="2">Description : {item.description}</p>
                            <p className="card-text" key="3">Status : {item.status}</p>
                            <h2>Project Tasks</h2>
                            <div className="overflowSmall ">
                                {item.taskSet.map((t) =>
                                    <Card
                                        name={t.name}
                                        priority={t.priority}
                                        status={t.status}
                                        date={t.date}
                                    />)
                                }
                            </div>
                        </div>

                    </div>
                )
                }

            </div>
        );
    }
}

export default Project;