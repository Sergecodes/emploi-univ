import React,{useState} from "react";
import logo from "../../assets/logo.png";
import { CalendarViewDayRounded, Person, ArrowBackRounded,PersonPin} from "@material-ui/icons";
import { Link } from "react-router-dom";

const NavbarAdmin = (props) => {
    const [showProfile, setShowProfile]=useState(false);
   
  return (
    <section className="navbarAdmin px-3 py-2 d-flex justify-content-between align-items-center">
      <div>
        <CalendarViewDayRounded />
        <Link to="/accueil">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <p className="fs-4 fw-bolder ">FACULTE DES SCIENCES</p>
      <div className="profileModif" style={{position:"relative"}}>
        <Person className="profileModifIcon" onClick={()=>setShowProfile(!showProfile)}  style={!showProfile?{}:{opacity:'0.5'}}/>
        <div style={!showProfile?{display:"none"}:{backgroundColor:"whitesmoke",position:"absolute",right:"0"}}>
            <Link to="/admin/editer" className="d-flex align-items-center" ><PersonPin className="pe-2"/> Editer Profil</Link>
            <Link to="/accueil" className="d-flex align-items-center" ><ArrowBackRounded className="pe-2"/> Deconnexion</Link>
        </div>
      </div>
    </section>
  );
};

export default NavbarAdmin;
