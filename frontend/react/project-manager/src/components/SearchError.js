import React from 'react';
import {useParams} from "react-router";
import ProjectsSearch from './ProjectSearch';

function Search() {
  let {name} = useParams();
  return (
    <div  className="d-flex flex-column">
      <h1>{name} no such project</h1>
    </div >
  );
}

export default Search;