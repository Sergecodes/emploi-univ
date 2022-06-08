import React,{useState} from "react";
import logo from "../../assets/logo.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link,useLocation } from "react-router-dom";

const Header = () => {
    const [dropHover ,setDropHover]=useState(false);
    const location = useLocation();
    console.log(location)
  return (
    <section className="header  row ">
      <div className="col-2 col-sm-2 logo " >
        <Link to="/"><img src={logo} alt="logo" /></Link>
      </div>
      <div className="headerLinks col-7 col-lg-8  ">
        <ul  style={{height:"100%"}}>
          <li><Link to="/accueil">Accueil</Link></li>
          <li>
            <Dropdown onMouseOver={()=>{setDropHover(true)}} onMouseLeave={()=>{setDropHover(false)}}>
              <Dropdown.Toggle variant="success" className="dropdown"   style={dropHover===false?{}:{color:'var(--secondaryBlue)'}}>Spécialités</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/affichage/computer-science">Informatique</Dropdown.Item>
                <Dropdown.Item   href="/affichage/math">Mathematique</Dropdown.Item>
                <Dropdown.Item   href="/affichage/physique">Physique</Dropdown.Item>
                <Dropdown.Item   href="/affichage/chimie">Chimie</Dropdown.Item>
                <Dropdown.Item   href="/affichage/bioscience">Bioscience</Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li><Link to="/filter">Filtre</Link></li>
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
