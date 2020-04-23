import React, { Component } from 'react';
import Card from './TaskCard';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            name: ''
        }
    }

    componentDidMount() {
        axios
            .get("http://localhost:8080/api/task")
            .then(res => {
                this.setState({ tasks: res.data })
            })

    }

    Submit = async (event) => {
        event.preventDefault();

        await axios.get(`http://localhost:8080/api/task/name/${this.state.name}`)
        .then(res => {
            this.setState({ tasks: res.data })
        })

    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    render() {
        var { tasks } = this.state;
        return (
            <div >
                {/* Page Heading */}
                <div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <h1 className="h3 mb-0 text-gray-800">TASKS</h1>
                    {/*  Topbar Search */}
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
                                <Link
                                    onClick={this.Submit}
                                    className="btn btn-primary"
                                    type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </Link>
                            </div>
                        </div>
                    </form>
                    
                </div>

                <div className="row ">
                    <div className="overflow">
                        {tasks.map((t) =>
                            <Card
                            id={t.id}
                            name={t.name}
                            pName={t.projectN}
                            priority={t.priority}
                            status={t.status}
                            date={t.date}
                            />)}
                    </div>

                </div>

            </div>
        )
    }

}

export default Tasks;