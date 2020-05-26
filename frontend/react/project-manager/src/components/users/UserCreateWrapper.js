import React from 'react';
import UserCreate from './UserCreate'
import { useHistory } from "react-router-dom";


function Create() {
    let history = useHistory();
  return (
    <div>
      <UserCreate history={history} />
    </div >
  );
}

export default Create;