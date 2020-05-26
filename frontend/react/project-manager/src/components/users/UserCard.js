import React, { Component } from 'react';

import axios from 'axios';
import history from '../login/History';
import AuthenticationService from '../fetch/FetchService';

const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
const isAdminLoggedIn = AuthenticationService.isAdminLoggedIn();

class Card extends Component {

    Submit = () => {
        axios.delete(`http://localhost:8080/api/v1/admin/user/delete/${this.props.id}`,
        { headers: { Authorization: sessionStorage.getItem('token') } }
        )
            .then(res => {
                this.props.history.push(`/users`);
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
            <tr  key={this.props.id} >
                <th scope="row">{this.props.id}</th>
                <td>{this.props.name}</td>
                <td>{this.props.firstName}</td>
                <td>{this.props.lastName}</td>
                <td>{this.props.email}</td>
                <td>{this.props.data}</td>
                <td>
                {isAdminLoggedIn && <button className="btn btn-sm btn-outline-danger" onClick={this.Submit}>DELETE</button>}
                </td>
            </tr>
        );
    }
}

export default Card;