import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import{ handleOpenAjout,handleOpenSnackbar, handleAlert} from "../../../redux/ModalDisplaySlice";
import {BsTrash, BsPlus} from "react-icons/bs";



const AjoutSpecialite = () => {
  const [specialite,setSpecialite]= useState([]);
  const [listeFilieres, setListeFilieres]= useState([]);
  const [choixFiliere, setChoixFiliere]=useState("");
  const csrftoken = Cookies.get('csrftoken');
  const dispatch=useDispatch();

  useEffect(()=>{
    axios
    .get("http://localhost:8000/api/filieres/")
    .then((res) => {
      setChoixFiliere(res.data[0].nom);
      setListeFilieres(res.data)
    })
    .catch((err) => console.log(err));
  },[])


  const handleClick=()=>{
    setSpecialite([...specialite,{id:specialite.length ,nom:"",licence:false, master:false}])
  }

  const handleCheckboxChange=(nom,id)=>{
    const new_specialite= [...specialite];
    new_specialite[id][nom]=!(new_specialite[id][nom]);
    setSpecialite(new_specialite)
  }

  const handleInputChange=(e,id)=>{
    const new_specialite= [...specialite];
      new_specialite[id].nom=e.target.value;
      setSpecialite(new_specialite)
   
 }
 
 const handleDelete=(e,id)=>{
  const new_specialite= specialite.filter(elt=>elt.id!==id);
  setSpecialite(new_specialite)
}


  const headers={
    'X-CSRFToken': csrftoken
  }
  const handleAjout = () => {
    axios({
      method:'post',
      url:"http://localhost:8000/api/specialites/",
      data:{nom_filiere:choixFiliere,specialites:specialite},
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

  
  };



  return (
    <section
      className="d-flex justify-content-center row"
      style={{ width: "100%" }}
    >
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-8">
      <h4 className="fs-5 fw-light text-center">
          Vous ètes sur le point d'ajouter des informations relatives à une nouvelle spécialité dans votre emploi de temps
        </h4>
        <div className="mt-4">
        <div className="my-4 d-flex justify-content-center ">
            <label htmlFor="filiere">Filiere :</label>
            <select name="filiere" onChange={(e)=>setChoixFiliere(e.target.value)}>
            {
                listeFilieres.map((elt,index)=>{
                  return(
                  
                      <option key={index} name={elt.nom}>{elt.nom}</option>
      
                  )
                })
              }
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center my-3 align-items-center ">
            <div className="fw-bold">Ajouter une spécialité </div>
            <button type="button" className="btn buttonSpecialityAdd mx-4" onClick={handleClick}><BsPlus/></button>
        </div>
        <div>
          {
              specialite.map(elt=>{
                  return(
                      <div className="d-flex justify-content-between  align-items-center mx-1 my-3" key={elt.id}>
                          <div>
                            <label htmlFor={elt.id}>Spécialité :</label>
                            <input type="text" id={elt.id} value={specialite[elt.id].nom} onChange={(e)=>handleInputChange(e,elt.id)}></input>
                          </div>
                        <div className="d-flex ">
                            <div className="me-2">
                              <input type="checkbox" id="master" name="master" value="master" checked={specialite[elt.id].master} onChange={()=>handleCheckboxChange("master",elt.id)}></input>
                              <label htmlFor='master' >Master</label>
                            </div>
                           <div>
                            <input type="checkbox" id="licence" name="licence" value="licence" checked={specialite[elt.id].licence} onChange={()=>handleCheckboxChange("licence",elt.id)}></input>
                              <label htmlFor='licence'>licence</label>
                           </div>
                        </div>
                        <button type="button" className="btn btn-danger deleteSpeciality" onClick={e=>handleDelete(e,elt.id)}><BsTrash/></button>
                      </div>
                  )
              })
          }
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

export default AjoutSpecialite;
