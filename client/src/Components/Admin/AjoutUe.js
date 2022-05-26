import React from "react";
import { filiere } from "../../Constant";
import { useNavigate } from "react-router";

const AjoutUe = () => {
    const navigate = useNavigate();
  return (
    <section
      className="d-flex justify-content-center row"
      style={{ width: "100%" }}
    >
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-7">
        <h4 className="fs-5 fw-light text-center">
          Vous ètes sur le point d'ajouter une nouvelle UE à votre emploi
          de temps
        </h4>
        <div className="mt-4">
          <div className="my-3">
            <label htmlFor="nom">Code_Ue :</label>
            <input type="text" name="nom" style={{ minWidth: "70%" }}></input>
          </div>
          <div className="my-3">
            <label htmlFor="prenom">Intitulé :</label>
            <input
              type="text"
              name="prenom"
              style={{ minWidth: "70%" }}
            ></input>
          </div>
          <div className="my-3">
            <label htmlFor="nom">Nom enseignant :</label>
            <input
              type="text"
              name="nom"
              style={{ minWidth: "60%" }}
            ></input>
          </div>
          <div className="my-3">
            <label for="filiere">Filiere :</label>
            <select name="filiere">
                {
                    filiere.map(elt=>{
                        return(
                            <option key={elt.id} name={elt.nom}>{elt.nom}</option>
                        )
                    })
                }
            </select>
          </div>
          <div className="my-3">
            <label for="niveau">Niveau :</label>
            <select name="niveau">
            <option name="master">License 1</option>
              <option name="doctorat">License 2</option>
              <option name="doctorat">License 3</option>
              <option name="master">master</option>
              <option name="doctorat">doctorat</option>
            </select>
          </div>
          <div className="my-3">
            <label for="specialite">Specialite :</label>
            <select name="specialite">
              <option name="data-science">Data Science</option>
              <option name="genie-logiciel">doctorat</option>
            </select>
          </div>
        </div>
        <div
          className="my-3 d-flex justify-content-end "
          style={{ width: "100%" }}
        >
          <button
            className="btn me-2 cancelButton"
            type="button"
            onClick={() => navigate("/admin/dashboard")}
          >
            Annuler{" "}
          </button>
          <button className="btn addButton" type="button">
            Ajouter
          </button>
        </div>
      </div>
    </section>
  );
};

export default AjoutUe;
