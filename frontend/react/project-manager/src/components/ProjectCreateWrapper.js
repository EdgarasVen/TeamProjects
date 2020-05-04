import React from 'react';
import ProjectCreate from './ProjectCreate'
import { useHistory } from "react-router-dom";


function Create() {
    let history = useHistory();
  return (
    <div>
      <ProjectCreate history={history} />
    </div >
  );
}

export default Create;