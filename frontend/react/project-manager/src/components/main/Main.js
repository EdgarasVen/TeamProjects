import React, { Component } from 'react';
import Topbar from './Topbar';

import Projects from '../projects/Projects';
import CreateProject from '../projects/ProjectCreateWrapper';
import ProjectInfo from '../projects/ProjectInfoWrapper';
import ProjectEdit from '../projects/ProjectEditWrapper';

import Tasks from '../tasks/Tasks';
import TaskCreate from '../tasks/TaskCreateWrapper';
import TaskEdit from '../tasks/TaskEditWrapper';

import CreateUser from '../users/UserCreateWrapper';
import Users from '../users/Users';
import Login from '../login/Login';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

class Main extends Component {



    render() {

        return (
            <div className="d-flex" id="wrapper">
                <Router >
                    <div id="page-content-wrapper">
                        <Topbar />
                        <div className="mx-5">
                            <Switch>
                                <Route path="/login">
                                    <Login />
                                </Route>
                                <Route path="/projects">
                                    <Projects />
                                </Route>
                                <Route path="/tasks">
                                    <Tasks />
                                </Route>
                                <Route path="/create/">
                                    <CreateProject />
                                </Route>
                                <Route path="/user/create">
                                    <CreateUser />
                                </Route>
                                <Route path="/project/info/:id">
                                    <ProjectInfo />
                                </Route>
                                <Route path="/users">
                                    <Users />
                                </Route>
                                <Route path="/project/add/:id">
                                    <TaskCreate />
                                </Route>
                                <Route path="/project/edit/:id">
                                    <ProjectEdit />
                                </Route>
                                <Route path="/task/edit/:id">
                                    <TaskEdit />
                                </Route>
                            </Switch>
                        </div>

                    </div>
                </Router>
            </div>
        )
    }

}

export default Main;