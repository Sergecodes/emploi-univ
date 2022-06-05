import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import{ handleOpenAjout} from "../../../redux/ModalDisplaySlice";
import {BsTrash, BsPlus} from "react-icons/bs";



const AjoutGroupe = () => {
  const [groupe,setGroupe]= useState([]);
  const [listeFilieres, setListeFilieres]= useState([]);
  const [listeNiveaux, setListeNiveaux]= useState([]);
  const [choix,setChoix]=useState({nom:" ",nom_niveau:' ',nom_specialite:" "});
  const csrftoken = Cookies.get('csrftoken');
  const dispatch=useDispatch();
  const axiosLinks =[
    'http://localhost:8000/api/filieres/',
    'http://localhost:8000/api/niveaux/'
  ]
  /*
  Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
  axios.spread((...allData) => {
    console.log({ allData });
  })
);*/
  useEffect(()=>{
    Promise.all(axiosLinks.map((link) => axios.get(link)))
    .then(
      axios.spread((...allData) => {
        setListeFilieres(allData[0].data);
        setListeNiveaux(allData[1].data);
        setChoix({...choix,nom_niveau:allData[1].data[0].nom_bref,nom:allData[0].data[0].nom});
      }))
      .catch(err=>console.log(err))
  },[])

 


  const handleClick=()=>{
    setGroupe([...groupe,{id:groupe.length ,nom_groupe:" "}])
  }

 
  const handleInputChange=(e,id)=>{
    const new_groupe= [...groupe];
      new_groupe[id].nom_groupe=e.target.value;
      setGroupe(new_groupe)
   
 }


 
 const handleDelete=(e,id)=>{
  const new_groupe= groupe.filter(elt=>elt.id!==id);
  setGroupe(new_groupe)
}


const handleSelectChange=(e)=>{
  const name= e.target.name;
  const value= e.target.value;
  setChoix({...choix, [name]:value})
}

 const headers={
    'X-CSRFToken': csrftoken
  }
  const handleAjout = () => {
    axios({
      method:'post',
      url:"http://localhost:8000/api/groupes/",
      data:{nom_filiere:choix.nom,nom_niveau:choix.nom_niveau,groupes:groupe},
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
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-8">
      <h4 className="fs-5 fw-light text-center">
          Vous ètes sur le point d'ajouter des informations relatives à un nouveau groupe dans votre emploi de temps
        </h4>
        <div className="mt-4">
        <div className="my-4 d-flex justify-content-center ">
            <label htmlFor="nom">Filiere :</label>
            <select name="nom" onChange={e=>handleSelectChange(e)}>
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
        <div className="my-4 d-flex justify-content-center ">
            <label htmlFor="nom_niveau">Niveau :</label>
            <select name="nom_niveau" onChange={e=>handleSelectChange(e)}>
            {
                listeNiveaux.map((elt,index)=>{
                  return(
                  
                      <option key={index} name={elt.nom_bref}>{elt.nom_bref}</option>
      
                  )
                })
              }
            </select>
          </div>
        
        <div className="d-flex justify-content-center my-3 align-items-center ">
            <div className="fw-bold">Ajouter un groupe </div>
            <button type="button" className="btn buttonSpecialityAdd mx-4" onClick={handleClick}><BsPlus/></button>
        </div>
        <div>
          {
              groupe.map(elt=>{
                  return(
                      <div className="d-flex justify-content-around  align-items-center mx-1 my-3" key={elt.id}>
                          <div>
                            <label htmlFor={elt.id}>Groupe :</label>
                            <input type="text" id={elt.id} value={groupe[elt.id].nom_groupe} onChange={(e)=>handleInputChange(e,elt.id)}></input>
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

export default AjoutGroupe;
