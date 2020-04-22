import React from 'react';
import TaskCreate from './TaskCreate'
import {useParams} from "react-router";

function Info() {
  let {id} = useParams();
  return (
    <div  className="d-flex flex-column">
      <TaskCreate id={id} />
    </div >
  );
}

export default Info;