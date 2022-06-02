import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import{ handleOpenAjout} from "../../../redux/ModalDisplaySlice";


const AjoutSalle = () => {
  const [ajoutSalle, setAjoutSalle] = useState({ nom: "", capacite: 0 });
  const csrftoken = Cookies.get('csrftoken');
  const dispatch=useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAjoutSalle({ ...ajoutSalle, [name]: value });
  };

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
      url:"http://localhost:8000/api/salles/",
      data:ajoutSalle,
      headers:headers,
      withCredentials:true
    })
    .then(res=>console.log(res),() => dispatch(handleOpenAjout()))
    .catch(err=>console.error(err))
  };

  return (
    <section
      className="d-flex justify-content-center row"
      style={{ width: "100%" }}
    >
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-6">
        <h4 className="fs-5 fw-light text-center">
          Vous ètes sur le point d'ajouter une nouvelle salle à votre emploi de
          temps
        </h4>
        <div className="mt-4">
          <div className="my-3">
            <label htmlFor="nom">Nom de la salle :</label>
            <input
              type="text"
              name="nom"
              style={{ minWidth: "70%" }}
              onChange={handleChange}
            ></input>
          </div>
          <div className="my-3">
            <label htmlFor="capacite">Capacité :</label>
            <input
              type="number"
              name="capacite"
              min="1"
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

export default AjoutSalle;
