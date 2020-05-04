import React, { Component } from 'react';
import axios from 'axios';
import {
    Link
} from "react-router-dom";


class Card extends Component {

    Submit = () => {
        axios.delete(`http://localhost:8080/api/task/${this.props.id}`)
            .then(res => {
                console.log("---"+"");
                this.props.history.push(`/tasks`);
            })
    }

    render() {
        return (
            <tr key={this.props.id}>
                <th scope="row">{this.props.id}</th>
                <td>{this.props.name}</td>
                <td>{this.props.priority}</td>
                <td>{this.props.description}</td>
                <td>{this.props.date}</td>
                <td>{this.props.status}</td>
                <td>
                    <Link className="btn btn-sm btn-outline-info" to={`/task/edit/${this.props.id}`}>Edit Task</Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={this.Submit}>DELETE</button>
                </td>
            </tr>
        );
    }
}

export default Card;