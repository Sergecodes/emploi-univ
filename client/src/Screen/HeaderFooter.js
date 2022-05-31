import React from 'react';
import Header from '../Components/Common/Header';
import Footer from '../Components/Common/Footer';
import { Outlet } from 'react-router';
import "../index.css"

const HeaderFooter = () => {
  return (
    <section>
        <Header/>
        <Outlet/>
        <Footer/>
    </section>
  )
}

export default HeaderFooter