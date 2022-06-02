import React, { useState } from "react";
import { Alert } from "@mui/material";
import { handleOpenModify } from "../../../redux/ModalDisplaySlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

const ModifierEnseignant = (props) => {
  const [alert, setAlert] = useState("none");
  const actual = props.enseignant;
  const [updateEnseignant, setUpdateEnseignant] = useState(props.enseignant);
  const dispatch = useDispatch();
  const csrftoken = Cookies.get("csrftoken");
  const headers = {
    "X-CSRFToken": csrftoken,
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateEnseignant({ ...updateEnseignant, [name]: value });
  };
  const handleUpdate = () => {
     
    if (
      actual.nom === updateEnseignant.nom &&
      actual.prenom === updateEnseignant.prenom &&
      actual.matricule === updateEnseignant.matricule
    ) {
      setAlert("warning");
    } else {
      setAlert("none")
      axios({
        method: "put",
        url: `http://localhost:8000/api/enseignants/${encodeURIComponent(
          actual.matricule
        )}/`,
        data: { new_nom: updateEnseignant.nom, new_prenom: updateEnseignant.prenom, new_matricule:updateEnseignant.matricule },
        headers: headers,
        withCredentials: true,
      })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div
      className="d-flex justify-content-center row"
      style={{ width: "100%" }}
    >
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-6">
        <h4 className="fs-5 fw-light text-center">
          Modification des informations concernant un enseignant
        </h4>
        <div className="my-2">
          <Alert
            severity="warning"
            style={alert !== "warning" ? { display: "none" } : {}}
          >
            Veuillez effectuez un changement avant de cliquer sur modifier
          </Alert>
        </div>
        <div className="mt-4">
          <div className="my-3">
            <label htmlFor="nom">Nom :</label>
            <input
              type="text"
              name="nom"
              style={{ minWidth: "70%" }}
              value={updateEnseignant.nom}
              onChange={handleChange}
            ></input>
          </div>
          <div className="my-3">
            <label htmlFor="prenom">Prenom :</label>
            <input
              type="text"
              name="prenom"
              style={{ minWidth: "70%" }}
              value={updateEnseignant.prenom}
              onChange={handleChange}
            ></input>
          </div>
          <div className="my-3">
            <label htmlFor="matricule">Matricule :</label>
            <input
              type="text"
              name="matricule"
              style={{ minWidth: "80px" }}
              value={updateEnseignant.matricule}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div
          className="my-3 d-flex justify-content-end "
          style={{ width: "100%" }}
        >
          <button
            className="btn me-2 cancelButton"
            type="button"
            onClick={()=>dispatch(handleOpenModify())}
          >
            Annuler{" "}
          </button>
          <button
            className="btn addButton"
            type="button"
            onClick={handleUpdate}
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifierEnseignant;
