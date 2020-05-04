import React from 'react';
import ProjectInfo from './ProjectInfo'
import { useHistory, useParams } from "react-router-dom";


function Info() {
    let {id} = useParams();
    let history = useHistory();
  return (
    <div  >
      <ProjectInfo 
      id={id}
      history={history} 
      />
    </div >
  );
}

export default Info;