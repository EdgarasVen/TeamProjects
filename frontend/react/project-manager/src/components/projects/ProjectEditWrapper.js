import React from 'react';
import Project from './ProjectEdit'
import { useHistory, useParams } from "react-router-dom";


function Create() {
    let {id} = useParams();
    let history = useHistory();
  return (
    <div  >
      <Project 
      id={id}
      history={history} />
    </div >
  );
}

export default Create;