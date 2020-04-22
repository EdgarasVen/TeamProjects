import React from 'react';
import ProjectInfo from './ProjectInfo'
import {useParams} from "react-router";

function Info() {
  let {name} = useParams();
  return (
    <div  className="d-flex flex-column">
      <ProjectInfo name={name} />
    </div >
  );
}

export default Info;