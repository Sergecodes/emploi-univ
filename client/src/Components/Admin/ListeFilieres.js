import React from 'react';
import tableIcons from "../Common/MaterialTableIcons"
import MaterialTable from "material-table";

const ListeFilieres = () => {


const data = [
  {id:1, name: "Mohammad", surname: "Faisal", birthYear: 1995 },
  {id:2, name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
  { id:3,name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
  { id:4,name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
];

const columns = [
  { title: "Name", field: "name",align:"center" },
  { title: "Surname", field: "surname",align:"center" },
  { title: "Birth Year", field: "birthYear", type: "numeric",align:"center" },
];

  return (
    <section className="materialTableSalle">
       <MaterialTable title="Basic Table"
    actions={[
      {
        icon: tableIcons.Delete,
        tooltip: "Delete User",
        onClick: (event, rowData) => alert("You want to delete " + rowData.name +"which has a id of"+rowData.id),
      },
      {
        icon: tableIcons.Add,
        tooltip: "Add User",
        isFreeAction: true,
        onClick: (event) => alert("You want to add a new row"),
      },
    ]}
    icons={tableIcons} columns={columns} data={data} options={{paging:false,grouping:true}}/>
    </section>
  )
}

export default ListeFilieres