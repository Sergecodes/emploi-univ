import React from 'react';
import {BsFacebook, BsTwitter} from "react-icons/bs";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <section className=" py-3"style={{backgroundColor:"var(--primaryBlue)",color:"white"}}>
        <div className="d-flex justify-content-around">
            <p className="text-center">University of Yaoundé 1- Faculty of Science</p>
            <div >
                <Link to="/accueil"><BsFacebook className="me-3" style={{cursor:"pointer",color:"white"}}/></Link>
                <Link to="/accueil" style={{cursor:"pointer",color:"white"}}><BsTwitter/></Link>
            </div>
        </div>
        <div className="text-center">
        Copyright © 2022 All rights reserved 
        </div>
    </section>
  )
}

export default Footer