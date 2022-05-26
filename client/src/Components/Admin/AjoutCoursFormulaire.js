import React from "react";
import { useNavigate } from "react-router";

const AjoutCoursFormulaire = () => {
  const navigate = useNavigate();
  return (
    <section
      className="d-flex justify-content-center row"
      style={{ width: "100%" }}
    >
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-7">
        <h4 className="fs-5 fw-light text-center">
          Vous ètes sur le point d'ajouter un nouveau cours à votre emploi de
          temps
        </h4>
        <div className="mt-4">
          <div className="my-3">
            <label htmlFor="nom">Code_Ue :</label>
            <input type="text" name="nom" ></input>
          </div>
          <div className="my-3">
            <label htmlFor="nom">Nom enseignant :</label>
            <input type="text" name="nom" style={{ minWidth: "60%" }}></input>
          </div>
          <div className="my-3">
            <label htmlFor="nom-salle">Nom de la salle :</label>
            <input type="text" name="nom-salle"></input>
          </div>
          <div className="my-3">
            <label for="jour">Jour :</label>
            <select name="jour">
              <option name="lundi">Lundi</option>
              <option name="mardi">Mardi</option>
              <option name="mecredi">Mecredi</option>
              <option name="jeudi">Jeudi</option>
              <option name="vendredi">Vendredi</option>
              <option name="samedi">Samedi</option>
            </select>
          </div>
          <div className="my-3">
            <label for="heure-debut">Heure debut :</label>
            <input type="time" name="heure-debut"  min="07:00" max="20:55"></input>
          </div>
          <div className="my-3">
            <label for="heure-fin">Heure fin :</label>
            <input type="time" name="heure-fin"  min="08:00" max="21:55"></input>
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

export default AjoutCoursFormulaire;
