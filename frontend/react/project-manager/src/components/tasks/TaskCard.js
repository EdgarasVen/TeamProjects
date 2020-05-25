import React, { Component } from 'react';
import axios from 'axios';
import {
    Link
} from "react-router-dom";
import history from '../login/History';
import AuthenticationService from '../fetch/FetchService';

const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
const isAdminLoggedIn = AuthenticationService.isAdminLoggedIn();

class Card extends Component {

    Submit = () => {
        axios.delete(`http://localhost:8080/api/v1/admin/task/${this.props.id}`,
        { headers: { Authorization: sessionStorage.getItem('token') } }
        )
            .then(res => {
                this.props.history.push(`/tasks`);
                
            })
            .catch(function (error) {
                if (error.status==="undefined" && !isUserLoggedIn){
                    alert("You are not authorized to access this page");
                    history.push(`/login`)
                    window.location.reload()
                }
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

                    {isAdminLoggedIn && <button className="btn btn-sm btn-outline-danger" onClick={this.Submit}>DELETE</button>}
                </td>
            </tr>
        );
    }
}

export default Card;