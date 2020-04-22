import React from 'react';
import ProjectCreate from './ProjectCreate'
import { useHistory } from "react-router-dom";


function Edit() {
    let history = useHistory();
  return (
    <div  className="d-flex flex-column">
      <ProjectCreate history={history} />
    </div >
  );
}

export default Edit;