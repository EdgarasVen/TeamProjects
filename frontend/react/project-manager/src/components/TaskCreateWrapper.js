import React from 'react';
import TaskCreate from './TaskCreate'
import {useParams} from "react-router";
import { useHistory } from "react-router-dom";
import { hydrate } from 'react-dom';

function Info() {
  let {id} = useParams();
  let history = useHistory();
  return (
    <div  className="d-flex flex-column">
      <TaskCreate 
      id={id}
      history={history}
       />
    </div >
  );
}

export default Info;