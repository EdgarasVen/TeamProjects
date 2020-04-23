import React from 'react';
import Info from './TaskInfo'
import {useParams} from "react-router";

function TaskInfo() {
  let {id} = useParams();
  return (
    <div  className="d-flex flex-column">
      <Info id={id} />
    </div >
  );
}

export default TaskInfo;