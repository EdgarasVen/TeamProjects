import React from 'react';
import ProjectEdit from './ProjectEdit'
import {useParams} from "react-router";

function Edit() {
  let {name} = useParams();
  return (
    <div  className="d-flex flex-column">
      <ProjectEdit name={name} />
    </div >
  );
}

export default Edit;