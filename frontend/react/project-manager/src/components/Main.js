import React, { Component } from 'react';
import Topbar from './Topbar';

import Projects from './Projects';
import CreateProject from './ProjectCreateWrapper';
import ProjectInfo from './ProjectInfoWrapper';
import ProjectEdit from './ProjectEditWrapper';

import Tasks from './Tasks';
import TaskCreate from './TaskCreateWrapper';
import TaskEdit from './TaskEditWrapper';

import Login from './login/Login';

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
                            <Route path="/project/info/:id">
                                <ProjectInfo />
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
                </Router>
            </div>
        )
    }

}

export default Main;