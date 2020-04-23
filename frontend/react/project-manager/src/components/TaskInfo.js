import React, { Component } from 'react';
import Card from "./TaskCard";
import axios from 'axios';
import {
    Link
} from "react-router-dom";


class Task extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isFetching: false,
        }
    }

    componentDidMount() {
        axios
            .get(`http://localhost:8080/api/task/id/${this.props.id}`)
            .then(res => {
                this.setState({ tasks: res.data,
                                isFetching: true, })
            })
    }

    render() {
        var { isFetching,tasks } = this.state;
        if (!isFetching){
            return <div>Loading ....</div>
        }
        else{
        return (
            <div >
                {/* Page Heading */}
                <div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <h1 className="h3 mb-0 text-gray-800">{tasks[0].name}</h1>

                    <Link to={`/project/edit/${this.props.id}`} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-4">
                        <i className="fas  fa-sm text-white-50"></i> Edit </Link>
                    <Link to="" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-4">
                        <i className="fas  fa-sm text-white-50"></i> Delete </Link>
                </div>
                {tasks.map((item, i) =>
                    <div>
                        <div className="card-body">
                            <p className="card-text " key="1">Name : {item.name}</p>
                            <p className="card-text" key="2">Priority : {item.priority}</p>
                            <p className="card-text" key="3">Status : {item.status}</p>                       
                        </div>

                    </div>
                )
                }

            </div>
        );
        }
    }
}

export default Task;