import React, { Component } from 'react';

import AutService from '../fetch/FetchService';
import history from './History';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

    }

    loginClicked = (event) => {
        event.preventDefault();
        AutService
            .executeJwtAuthenticationService(this.state.name, this.state.password)
            .then((res) => {
                console.log("login--"+res.data.roles)
                AutService.registerJwtTT(res.data.token)
                AutService.registerUserRole(res.data.roles)
                history.push(`/projects`)
                window.location.reload()
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }
    

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    render() {
        return (

            <header className="jumbotron my-4">
                
                <div>
                    <h1>Login</h1>
                    <div className="container">
                        
                        {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                        {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                        
                    User Name: <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                        <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                    </div>
                </div>
            </header>
        )
    }

}


export default Header;