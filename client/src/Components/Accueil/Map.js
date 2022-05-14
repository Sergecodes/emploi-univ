import React from 'react';
import map from "../../assets/map.jpeg";

const Map = () => {
  return (
    <section >
        <p className="fs-3 fw-light text-center my-3">LOCATION</p>
        <div className="row" style={{color:"rgb(71, 68, 68)"}}>
            <div className="col-12 col-sm-6">
                <div className="m-3">
                    <img src={map} alt=" nothing " style={{width:"100%",height:"330px"}}/>
                </div>
            </div>
            <div className="col-12 col-sm-6">
               <div className="m-3 contactInfo">
                    <p>Université de Yaoundé 1</p>
                    <p> Faculté des sciences</p>
                    <p><span style={{color:"darkgray"}}>Contact: </span>+237 222 22 13 20</p>
                    <p><span style={{color:"darkgray"}}>Ouvert: </span> 24h/24 7j/7</p>
                    <p><span style={{color:"darkgray"}}>Site: </span> https://facsciences.uy1.cm/</p>
                    <p><span style={{color:"darkgray"}}>BP: </span> 812 Yaoundé-Cameroun</p>
               </div>
            </div>
        </div>
    </section>
  )
}

export default Map