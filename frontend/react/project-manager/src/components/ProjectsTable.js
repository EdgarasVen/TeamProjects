import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

import {
  Link
} from "react-router-dom";


import Table from "./Table";
import "../App.css";

function App() {
  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:8080/api/project");
      setData(result.data);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        // first group - Project
        Header: "Project",
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
                to={`project/info/${cellInfo.row.values.id}`}
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
            Header: "Description",
            accessor: "description"
          },
          {
            Header: "Status",
            accessor: "status"
          }


        ]
      },

    ],
    []
  );

    let overflowType = "overflow";
  return (
    <div className="App">
      <Table
        overflow={overflowType}
        columns={columns}
        data={data}
      />
    </div>
  );
}

export default App;