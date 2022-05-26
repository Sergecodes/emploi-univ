import React from "react";
import { useNavigate } from "react-router";


const AjoutEnseignant = () => {
  const navigate = useNavigate();
  return (
    <section
      className="d-flex justify-content-center row"
      style={{ width: "100%" }}
    >
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-6">
        <h4 className="fs-5 fw-light text-center">
          Vous ètes sur le point d'ajouter un nouvel enseignant à votre
          emploi de temps
        </h4>
        <div className="mt-4">
          <div className="my-3">
            <label htmlFor="nom">Nom :</label>
            <input type="text" name="nom" style={{minWidth:"70%"}}></input>
          </div>
          <div className="my-3">
            <label htmlFor="prenom">Prenom :</label>
            <input type="text" name="prenom" style={{minWidth:"70%"}}></input>
          </div>
          <div className="my-3">
            <label htmlFor="matricule">Matricule :</label>
            <input type="text" name="matricule" style={{minWidth:"80px"}}></input>
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

export default AjoutEnseignant;
