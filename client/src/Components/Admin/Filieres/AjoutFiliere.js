import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import{ handleOpenAjout} from "../../../redux/ModalDisplaySlice";


const AjoutFiliere = () => {
  const [ajoutFiliere, setAjoutFiliere] = useState("");
  const csrftoken = Cookies.get('csrftoken');
  const dispatch=useDispatch();

  /* const handleAjout=()=>{
    axios.get("http://localhost:8000/api/salles/AMPHI 500/")
    .then(data=>console.log(data.data))
    .catch(err=>console.log(err))
  };*/
  const headers={
    'X-CSRFToken': csrftoken
  }
  const handleAjout = () => {
    axios({
      method:'post',
      url:"http://localhost:8000/api/filieres/",
      data:{nom:ajoutFiliere},
      headers:headers,
      withCredentials:true
    })
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
  };

  return (
    <section
      className="d-flex justify-content-center row"
      style={{ width: "100%" }}
    >
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-6">
      <h4 className="fs-5 fw-light text-center">
          Vous ètes sur le point d'ajouter des informations relatives à une nouvelle filière dans votre emploi de temps
        </h4>
        <div className="mt-4">
          <div className="my-3">
            <label htmlFor="nom">Nom filiere :</label>
            <input type="text" name="nom" value={ajoutFiliere} onChange={e=>setAjoutFiliere(e.target.value)} style={{minWidth:"70%"}}></input>
          </div>
        </div>
        <div
          className="my-3 d-flex justify-content-end "
          style={{ width: "100%" }}
        >
          <button
            className="btn me-2 cancelButton"
            type="button"
            onClick={() => dispatch(handleOpenAjout())}
          >
            Annuler{" "}
          </button>
          <button className="btn addButton" type="button" onClick={handleAjout}>
            Ajouter
          </button>
        </div>
      </div>
    </section>
  );
};

export default AjoutFiliere;
