import React, { Component } from 'react';
import Card from './TaskCard';
import axios from 'axios';


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
        axios
            .get("http://localhost:8080/api/task")
            .then(res => {
                console.log("---"+"");
                this.setState({
                    projects: res.data,
                    isFetching: true
                })
            })
    }


    Submit = (event) => {
        event.preventDefault();

        axios.get(`http://localhost:8080/api/project/name/${this.state.name}`)
            .then(res => {
                console.log("---"+"");
                this.setState({ projects: res.data })
            })

    }

    Submit = (event) => {
        axios.get(`http://localhost:8080/api/task/search/${this.state.name}`)
            .then(res => {
                console.log("---"+"");
                this.setState({
                    projects: res.data
                })

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