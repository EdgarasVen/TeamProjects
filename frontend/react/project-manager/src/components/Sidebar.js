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
        <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
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
      <li className="nav-item">
        <Link className="nav-link" to="/projects">
          <i className="fas fa-fw fa-folder"></i>
          <span>All Projects</span></Link>
      </li>

      {/* Nav Item - Tables */}
      <li className="nav-item">
        <Link className="nav-link" to="/tasks">
          <i className="fas fa-fw fa-table"></i>
          <span>All Tasks</span></Link>
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