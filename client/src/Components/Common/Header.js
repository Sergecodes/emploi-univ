import React,{useState} from "react";
import logo from "../../assets/logo.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

const Header = () => {
    const [dropHover ,setDropHover]=useState(false);
  return (
    <section className="header  row ">
      <div className="col-2 col-sm-2 logo " >
        <Link to="/"><img src={logo} alt="logo" /></Link>
      </div>
      <div className="headerLinks col-7 col-lg-8  ">
        <ul  style={{height:"100%"}}>
          <li><Link to="/accueil">Home page</Link></li>
          <li>
            <Dropdown onMouseOver={()=>{setDropHover(true)}} onMouseLeave={()=>{setDropHover(false)}}>
              <Dropdown.Toggle variant="success" className="dropdown"   style={dropHover===false?{}:{color:'var(--secondaryBlue)'}}>Speciality</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/computer-science">Computer science</Dropdown.Item>
                <Dropdown.Item   href="/mathematics">Mathematics</Dropdown.Item>
                <Dropdown.Item   href="/physics">Physics</Dropdown.Item>
                <Dropdown.Item   href="chemistry">Chemistry</Dropdown.Item>
                <Dropdown.Item   href="/bioscience">Bioscience</Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li><Link to="/filter">Filter</Link></li>
        </ul>
      </div>
      <div className="col-3 col-lg-2 d-flex align-items-center">
        <Link to="/connexion">
          <button className="adminButton " type="button">
            Connexion Admin
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Header;

//npm install bootstrap react-bootstrap react-router react-router-dom
