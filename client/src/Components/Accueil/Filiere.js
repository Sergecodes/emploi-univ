import React from "react";
import { filiere } from "../../Constant";
import { Link } from "react-router-dom";

const Filiere = () => {
  return (
    <section>
      <div className="fs-3 fw-light text-center my-3">
        {" "}
        SELECTIONNER UNE SPECIALITE
      </div>
      <div className="row d-flex justify-content-center">
        {filiere.map((elt) => {
          return (
            <div
              key={elt.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 filiereElement"
            >
              <Link to={elt.url}>
                <div className="m-1 mb-3">
                  <img src={elt.img} alt="#" className="specialityImg" />
                  <p> {elt.nom}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Filiere;
