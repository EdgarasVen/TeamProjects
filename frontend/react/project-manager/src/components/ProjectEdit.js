import React, { Component } from 'react';
import axios from 'axios';
import {
    Link
} from "react-router-dom";


class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectGet: [],
            projectPut: {}
        }
    }

    componentDidMount() {
        axios
            .get(`http://localhost:8080/api/project/${this.props.name}`)
            .then(res => {
                this.setState({ projectGet: res.data })
            })
    }

    render() {
        var { projectGet } = this.state;
        return (
            <div >
               
            </div>
        );
    }
}

export default Project;