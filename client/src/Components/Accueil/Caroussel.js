
import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import image2 from '../../assets/image2.jpg';
import image1 from '../../assets/image1.jpg';
import image3 from "../../assets/image3.jpg";
  
export default function Caroussel() {
  return (
    <section >
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src={image1}
            alt=" One"
            style={{height:"80vh",position:"relative"}}
          />
           <div className="text">
            <div className="firstDiv" >
              <div className="secondDiv">
                <div className="thirdDiv">
                  <div className="fourthDiv">
                      <div className="contentDiv">
                        <div>
                            <p className="p-0 m-0" style={{fontSize:"3vw"}}>Bienvenu à</p>
                            <h2 style={{fontSize:"5vw",fontWeight:"480"}}>TIME TABLE</h2>
                        </div>
                        <div >
                            Le plateforme dediée à l'édition et à la consultation des emplois de temps au sein de la faculté des sciences
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
           </div>
          <Carousel.Caption>
          
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
        <img
            className="d-block w-100"
            src={image2}
            alt=" One"
            style={{height:"80vh",position:"relative"}}
          />
           <div className="text">
            <div className="firstDiv" >
              <div className="secondDiv">
                <div className="thirdDiv">
                  <div className="fourthDiv2">
                      <div className="contentDiv">
                        <div>
                            <h2 style={{fontSize:"5vw",fontWeight:"480"}}>TIME TABLE</h2>
                        </div>
                        <div>
                            Service fiable et facile d'utilisation
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
           </div>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
        <img
            className="d-block w-100"
            src={image3}
            alt=" One"
            style={{height:"80vh",position:"relative"}}
          />
           <div className="text">
            <div className="firstDiv" >
              <div className="secondDiv">
                <div className="thirdDiv">
                  <div className="fourthDiv3">
                      <div className="contentDiv">
                        <div>
                            <h2 style={{fontSize:"5vw",fontWeight:"480"}}>TIME TABLE</h2>
                        </div>
                        <div>
                            Commencez maintenant
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
           </div>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}