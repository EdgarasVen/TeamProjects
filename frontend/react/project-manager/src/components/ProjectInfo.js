import React, { Component } from 'react';
import Card from "./TaskCard";
import Table from "./Table";
import axios from 'axios';
import {
    Link
} from "react-router-dom";


class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            isFetching: false,
        }
    }

    componentDidMount() {
        axios
            .get(`http://localhost:8080/api/project/id/${this.props.id}`)
            .then(res => {
                this.setState({ projects: res.data,
                                isFetching: true, })
            })
    }

    Submit = () => {
        axios.post(`http://localhost:8080/api/project`, {
          name: this.state.name,
          description: this.state.description,
          status: this.state.status
        })
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.props.history.push(`/projects`);
          })
      }

    render() {
        let overflowTypo="overflowSmall";
        var { isFetching,projects } = this.state;
        if (!isFetching){
            return <div>Loading ....</div>
        }
        else{
        return (
            <div >
                {/* Page Heading */}
                <div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <h1 className="h3 mb-0 text-gray-800">{projects[0].name}</h1>
                    <Link to={`/project/add/${this.props.id}`} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-4">
                        <i className="fas  fa-sm text-white-50"></i> Add Task </Link>
                    <Link to={`/project/edit/${this.props.id}`} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-4">
                        <i className="fas  fa-sm text-white-50"></i> Edit </Link>
                    <button onClick={this.Submit} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-4">
                        <i className="fas  fa-sm text-white-50"></i> Delete </button>
                </div>
                {projects.map((item, i) =>
                    <div>
                        <div className="card-body">
                            <p className="card-text " key="1">Name : {item.name}</p>
                            <p className="card-text" key="2">Description : {item.description}</p>
                            <p className="card-text" key="3">Status : {item.status}</p>
                       
                            <div >
                                    <Table
                                        overflow={overflowTypo}
                                        columns={this.props.columns}
                                        data={item.tasks}
                                        
                                    />
                                
                            </div>
                        </div>

                    </div>
                )
                }

            </div>
        );
        }
    }
}

export default Project;