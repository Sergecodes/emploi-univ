import React from 'react';
import Header from '../Components/Common/Header';
import Footer from '../Components/Common/Footer';
import { Outlet } from 'react-router';

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