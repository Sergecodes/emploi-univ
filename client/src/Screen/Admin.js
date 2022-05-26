import React from 'react';
import Sidenav from "../Components/Admin/Sidenav";
import "../Style/Admin.css";
import NavbarAdmin from '../Components/Admin/NavbarAdmin';
import { Outlet } from 'react-router';

const Admin = () => {
  
  return (
    <section className="d-flex">
        <Sidenav/>
        <div style={{width:"80vw",backgroundColor:"rgb(226, 222, 222)"}} >
          <NavbarAdmin />
          <Outlet/>
        </div>
    </section>
  )
}
//https://colorlib.com//polygon/concept/index.html
export default Admin