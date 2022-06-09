import React,{useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import{ handleOpenAjout,handleOpenSnackbar, handleAlert} from "../../../redux/ModalDisplaySlice";



const AjoutEnseignant = () => {
  const [enseignantInfo, setEnseignantInfo]=useState({
    nom:"",
    prenom:"",
    matricule:""
  })

  const csrftoken = Cookies.get('csrftoken');
  const dispatch= useDispatch();

  const handleChange=(e)=>{
    let name= e.target.name;
    let value= e.target.value;
    setEnseignantInfo({...enseignantInfo, [name]:value})
  }

  const headers={
    'X-CSRFToken': csrftoken
  }

  const handleAjoutEnseignant=()=>{
      axios({
        method:'post',
        url:"http://localhost:8000/api/enseignants/",
        data:enseignantInfo,
        headers:headers,
        withCredentials:true
      })
      .then(res=>{
        dispatch(handleOpenAjout());
        dispatch(handleOpenSnackbar())
        if(res.status===201){
          dispatch(handleAlert({type : "success"}))
        }
        else{
          dispatch(handleAlert({type : "error"}));
        }
       
       
      })
      .catch(err=>{
        dispatch(handleOpenAjout());
        dispatch(handleOpenSnackbar());
        dispatch(handleAlert({type : "error"}));
      })
  }

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
            <input type="text" name="nom" style={{minWidth:"70%"}} onChange={handleChange}></input>
          </div>
          <div className="my-3">
            <label htmlFor="prenom">Prenom :</label>
            <input type="text" name="prenom" style={{minWidth:"70%"}} onChange={handleChange}></input>
          </div>
          <div className="my-3">
            <label htmlFor="matricule">Matricule :</label>
            <input type="text" name="matricule" style={{minWidth:"80px"}} onChange={handleChange}></input>
          </div>
        
        </div>
        <div className="my-3 d-flex justify-content-end " style={{width:"100%"}}>
          <button className="btn me-2 cancelButton" type="button" onClick={()=>dispatch(handleOpenAjout())}>Annuler </button>
          <button className="btn addButton" type="button" onClick={handleAjoutEnseignant}>Ajouter</button>
        </div>
      </div>
    </section>
  );
};

export default AjoutEnseignant;
