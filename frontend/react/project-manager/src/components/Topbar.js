import React from 'react';
import AuthenticationService from './fetch/FetchService'

import {
  Link
} from "react-router-dom";

const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

function Sidebar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info border-bottom">


      <div className="collapse navbar-collapse"
        id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item " key="1">
            {!isUserLoggedIn && <div ><Link className="btn btn-sm" to="/login">Login</Link></div>}
            {isUserLoggedIn && <div ><Link className="btn btn-sm" to="/login" onClick={AuthenticationService.logout}>Logout</Link></div>}
          </li>
          {isUserLoggedIn &&              
            <li className="nav-item " key="2">
              <Link className="btn btn-sm" to="/projects">Project list</Link></li>}
          {isUserLoggedIn &&
          <li className="nav-item " key="3">
            <Link className="btn btn-sm" to="/tasks">Task list</Link>
          </li>}
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;