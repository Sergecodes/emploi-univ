import React from "react";
import { useNavigate } from "react-router";


const AjoutSalle = () => {
  const navigate = useNavigate();
  return (
    <section
      className="d-flex justify-content-center row"
      style={{ width: "100%" }}
    >
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-6">
        <h4 className="fs-5 fw-light text-center">
          Vous ètes sur le point d'ajouter une nouvelle salle à votre
          emploi de temps
        </h4>
        <div className="mt-4">
          <div className="my-3">
            <label htmlFor="nom">Nom de la salle :</label>
            <input type="text" name="nom" style={{minWidth:"70%"}}></input>
          </div>
          <div className="my-3">
            <label htmlFor="capacite">Capacité :</label>
            <input type="number" name="capacite" min="1"></input>
          </div>
        </div>
        <div className="my-3 d-flex justify-content-end " style={{width:"100%"}}>
          <button className="btn me-2 cancelButton" type="button" onClick={()=>navigate("/admin/dashboard")}>Annuler </button>
          <button className="btn addButton" type="button">Ajouter</button>
        </div>
      </div>
    </section>
  );
};

export default AjoutSalle;
