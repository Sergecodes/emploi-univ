import React from 'react';
import Sidenav from "../Components/Admin/Sidenav";
import "../Style/Admin.css";
import NavbarAdmin from '../Components/Admin/NavbarAdmin';
import { Outlet } from 'react-router';
import {useSelector} from "react-redux"

const Admin = () => {
  const files= useSelector(state=>state.SidenavDisplay);

  return (
    <section className="d-flex">
        <Sidenav/>
        <div style={files.open===true?{width:"80vw",backgroundColor:"rgb(226, 222, 222)"}:{width:"100%",backgroundColor:"rgb(226, 222, 222)",minHeight:"100vh"}} >
          <NavbarAdmin />
          <Outlet/>
        </div>
    </section>
  )
}
//https://colorlib.com//polygon/concept/index.html
export default Admin