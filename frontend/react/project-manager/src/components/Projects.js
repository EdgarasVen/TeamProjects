import React, { Component } from 'react';
import Card from './ProjectCard';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            name: ''
        }
    }

    componentDidMount() {
        axios
            .get("http://localhost:8080/api/project")
            .then(res => {
                this.setState({ projects: res.data })
            })

    }

    Submit = async (event) => {
        event.preventDefault();

        await axios.get(`http://localhost:8080/api/project/${this.state.name}`)
        .then(res => {
            this.setState({ projects: res.data })
        })

    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    render() {
        var { projects } = this.state;
        return (
            <div >
                {/* Page Heading */}
                <div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <h1 className="h3 mb-0 text-gray-800">PROJECTS</h1>
                    {/*  Topbar Search */}
                    <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div class="input-group">
                            <input 
                                type="text"
                                name="name"
                                class="form-control bg-light border-0 small"
                                placeholder="Search for..."
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                            />
                            <div class="input-group-append">
                                <Link
                                    onClick={this.Submit}
                                    className="btn btn-primary"
                                    type="button">
                                    <i class="fas fa-search fa-sm"></i>
                                </Link>
                            </div>
                        </div>
                    </form>
                    <Link to="/project/create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-4">
                        <i className="fas  fa-sm text-white-50"></i> Create new Project</Link>
                </div>

                <div className="row ">
                    <div className="overflow">
                        {projects.map((pr) =>
                            <Card
                                id={pr.id}
                                name={pr.name}
                                description={pr.description}
                                status={pr.status}
                            />)}
                    </div>

                </div>

            </div>
        )
    }

}

export default Projects;