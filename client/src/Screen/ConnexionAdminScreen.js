import React, { useState } from "react";
import "../Style/connexion.css";
import {useNavigate} from 'react-router-dom'
const logo = require("../assets/logo.png");


function ConnexionAdminScreen() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate();
  const handlesubmit = (e) => {
    if (user.email === "" || user.password === "") {
      alert("renseigner toutes vos informations");
    }
    else if(user.email=="admin@gmail.com" && user.password==='admin'){
        navigate('/admin')
    }
    e.preventDefault();
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="cover-component-left">
              <div className="cover-left"></div>
              <div>
                <p> WELCOME TO</p>
                <span className="time-table-text"> TIME TABLE</span>
              </div>
              <div className="bottom-text">
                Powered by University of Yaounde 1
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="component-right">
              <div className="connexion-right-top ">
                <img src={logo} alt="logo de emplois de temps" />
              </div>
              <div className="connexion-right-bottom ">
                <form>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="input-box col-md-12">
                        <p className="secondary-color">EMAIL</p>
                        <input
                          type="email"
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        ></input>
                      </div>{" "}
                      <div className="input-box col-md-12">
                        <p className="secondary-color">PASSWORD</p>{" "}
                        <input
                          type="password"
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
                        ></input>
                      </div>
                    </div>
                    <div className="checkbox-btn-login">
                      <div className="checkbox-box">
                        <input type="checkbox" />
                        <span className="secondary-color"> REMEMBER ME</span>
                      </div>
                      <div className="login-btb-box">
                        <input
                          type="submit"
                          id="submit-btn"
                          value="LOGIN"
                          onClick={handlesubmit}
                        ></input>
                      </div>
                    </div>
                    <p className="forgot-password-text secondary-color">
                      FORGOT YOUR PASSEWORD ?
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnexionAdminScreen;