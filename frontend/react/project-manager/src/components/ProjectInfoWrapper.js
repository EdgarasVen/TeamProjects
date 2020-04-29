import React, { useMemo} from 'react';
import ProjectInfo from './ProjectInfo'
import {useParams} from "react-router";
import {
  Link
} from "react-router-dom";

function ProjectsInfo() {

  const columns = useMemo(
    () => [
        {
            // first group - Project
            Header: "Task",
            // First group columns
            columns: [
                {
                    Header: "Id",
                    accessor: "id"
                },
                {
                    Header: "Name",
                    accessor: "name",
                    Cell: cellInfo => (
                        console.log(cellInfo),
                        <Link 
                          to={`../../task/info/${cellInfo.row.values.id}`}
                          id="1"> {cellInfo.row.values.name}</Link>
                      )
                }
            ]
        },
        {
            // Second group - Details
            Header: "Details",
            // Second group columns
            columns: [
                {
                    Header: "Priority",
                    accessor: "priority"
                },
                {
                    Header: "Status",
                    accessor: "status"
                },
                {
                    Header: "Date",
                    accessor: "date"
                },
                {
                    Header: "Project name",
                    accessor: "projectN"
                }
            ]
        }
    ],
    []
);

  let {id} = useParams();
  return (
    <div  className="d-flex flex-column">
      <ProjectInfo 
      id={id}
      columns={columns} />
    </div >
  );
}

export default ProjectsInfo;