import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Sidebar() {
  return (
    <div  >
      {/* Sidebar */}
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion " id="accordionSidebar" >

      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Manager <sup></sup></div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0"></hr>

      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <a className="nav-link" href="index.html">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Main Page</span></a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider"></hr>

      {/* Heading */}
      <div className="sidebar-heading">
        Interface
      </div>


      {/* Nav Item - Charts */}
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i class="fas fa-fw fa-cog"></i>
          <span>Projects</span>
        </a>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            
            <Link class="collapse-item" to="/projects">Project List</Link>
            <Link class="collapse-item" to="/project/create">Create New Project</Link>
          </div>
        </div>
      </li>

      {/* Nav Item - Tables */}
      <li className="nav-item">
        <Link className="nav-link" to="/tasks">
          <i className="fas fa-fw fa-table"></i>
          <span>Tasks</span></Link>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block"></hr>

      {/* Sidebar Toggler (Sidebar) */}
      
      {/*<div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>*/}
    </ul >
    
    {/* End of Sidebar */}
    </div >
  );
}

export default Sidebar;