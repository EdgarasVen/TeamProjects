import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";


class Card extends Component {
    render() {
        return (
            <div >
                {/* Dropdown Card Example */}

                <div className="card shadow mb-4">
                    {/* Card Header - Dropdown */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary"> {this.props.name}</h6>
                    
                        <div className="dropdown no-arrow">
                            <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                <div className="dropdown-header">Settings:</div>
                                
                                <Link className="dropdown-item" to={`project/info/${this.props.name}`} >More info</Link>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Delete this project</a>
                            </div>
                        </div>
                    </div>
                    {/* Card Body */}
                    <div className="card-body">
                        <p className="card-text " key="1">Name : {this.props.name}</p>
                        <p className="card-text" key="2">Description : {this.props.description}</p>
                        <p className="card-text" key="3">Status : {this.props.status}</p>

                    </div>

                </div>
            </div>
        );
    }
}

export default Card;