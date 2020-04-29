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
            const result = await axios("http://localhost:8080/api/task");
            setData(result.data);
        })();
    }, []);

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
                              to={`task/info/${cellInfo.row.values.id}`}
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

    let overflowType = "overflow";
    return (
        <div className="App">
            <Table 
            overflow={overflowType}
            columns={columns} 
            data={data} />
        </div>
    );
}

export default App;