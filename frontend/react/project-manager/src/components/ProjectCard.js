import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";

class Card extends Component {


    render() {
        return (
            <tr  key={this.props.id} >
                <th scope="row">{this.props.id}</th>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
                <td>{this.props.taskCompleted}/{this.props.taskSize}</td>
                <td>
                <div className="progress mb-4">
                                    <div
                                        className="progress-bar bg-info"
                                        role="progressbar"
                                        style={{width: `${this.props.progress}%`}}
                                        aria-valuemin="0" 
                                        aria-valuemax="100"></div>
                                </div>
                </td>
                <td>{this.props.status}</td>
                <td>
                    <Link className="btn btn-sm btn-outline-info" to={`project/info/${this.props.id}`}>Detail</Link>
                </td>
            </tr>
        );
    }
}

export default Card;