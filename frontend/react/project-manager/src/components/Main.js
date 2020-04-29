import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Projects from './ProjectsTable';
import ProjectInfo from './ProjectInfoWrapper';
import TaskInfo from './TaskInfoWrapper';
import ProjectCreate from './ProjectCreateWrapper';
import ProjectEdit from './ProjectEditWrapper';
import TaskCreate from './TaskCreateWrapper';
import Tasks from './TasksTable';

import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Main extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        
        return (
            <div id="wrapper">
                <Router >
                    <Sidebar />
                    <div id="content" className="container">
                    <Switch>
                        <Route path="/projects">
                        <Projects />
                        </Route>
                        <Route path="/tasks">
                        <Tasks />    
                        </Route>
                        <Route path="/project/create">
                        <ProjectCreate />    
                        </Route>
                        <Route path="/project/info/:id">
                        <ProjectInfo />    
                        </Route>
                        <Route path="/project/edit/:id">
                        <ProjectEdit />    
                        </Route>
                        <Route path="/project/add/:id">
                        <TaskCreate />    
                        </Route>
                        <Route path="/task/info/:id">
                        <TaskInfo />    
                        </Route>
                        <Route path="/project/info/task/info/:id">
                        <TaskInfo />    
                        </Route>
                    </Switch>
                    </div>               
                </Router>
            </div>
        )
    }

}

export default Main;