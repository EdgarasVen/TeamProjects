import React from 'react';
import Task from './TaskCreate'
import {useParams} from "react-router";
import { useHistory } from "react-router-dom";

function Info() {
  let {id} = useParams();
  let history = useHistory();
  return (
    <div  className="d-flex flex-column">
      <Task 
      id={id}
      history={history}
       />
    </div >
  );
}

export default Info;