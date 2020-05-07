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
            {!isUserLoggedIn && <div ><Link className="nav-link" to="/login">Login</Link></div>}
            {isUserLoggedIn && <div ><Link className="nav-link" to="/login" onClick={AuthenticationService.logout}>Logout</Link></div>}
          </li>
          {isUserLoggedIn &&           
          <li className="nav-item dropdown"  key="2">
            <a className="nav-link dropdown-toggle"
              href="/"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Projects
              </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/projects">Project list</Link>
              <Link className="dropdown-item" to="/create">Create new project</Link>

            </div>
          </li>}
          {isUserLoggedIn &&
          <li className="nav-item "  key="3">
            <Link className="nav-link" to="/tasks">Task list</Link>
          </li>}
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;