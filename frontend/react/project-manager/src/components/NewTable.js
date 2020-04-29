import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReportTable() {
    const [entries, setEntries] = useState({
        data: [
            {
                id: "",
                name: "",
                description: "",
                status: ""
            }
        ]
    });

    const [state] = React.useState({
        columns: [
            { title: "Id", field: "id" },
            { title: "Name", field: "name" },
            { title: "Description", field: "description" },
            { title: "Status", field: "status" }
        ]
    });

    useEffect(() => {
        axios
        .get("http://localhost:8080/api/project")
        .then(response => {
        let data = [];
    response.data.forEach(el => {
        data.push({
        id: el.id,
        name: el.name,
        description: el.description,
        status: el.status
    });
});
    setEntries({ data: data });
})
.catch(function(error) {
        console.log(error);
    });
}, []);

    return (
        <MaterialTable
    title="Report Table"
    columns={state.columns}
    data={entries.data}
    editable={{
        onRowUpdate: (newData, oldData) =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve();
            const data = [...entries.data];
            data[data.indexOf(oldData)] = newData;
            axios
                .put("http://localhost:8080/api/project", newData, {
                    params: {
                        id: entries.data[0].id
                    }
                })
                .then(res => console.log(res.data));
            setEntries({ ...entries, data });
        }, 600);
    }),
        onRowDelete: oldData =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve();
            const data = [...entries.data];
            data.splice(data.indexOf(oldData), 1);
            axios
                .delete("http://localhost:8080/api/project", {
                    params: {
                        id: entries.data[0].id
                    }
                })
                .then(res => console.log(res.data));
            setEntries({ ...entries, data });
        }, 600);
    })
    }}
    />
);
}