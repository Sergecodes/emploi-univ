import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import {BsTrash, BsPlus} from "react-icons/bs"

const AjoutFiliere = () => {

    const [specialite,setSpecialite]= useState([
      
    ])
    const handleClick=()=>{
        setSpecialite([...specialite,{id:specialite.length ,nom:" ",niveau:" "}])
    }

    const handleDelete=(e,id)=>{
        const new_specialite= specialite.filter(elt=>elt.id!==id);
        setSpecialite(new_specialite)
    }
    
    const navigate = useNavigate();


   
  return (
    <section
      className="d-flex justify-content-center row"
      style={{ width: "100%" }}
    >
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-7">
        <h4 className="fs-5 fw-light text-center">
          Vous ètes sur le point d'ajouter des informations relatives à une nouvelle filière dans votre emploi de temps
        </h4>
        <div className="mt-4">
          <div className="my-3">
            <label htmlFor="nom">Nom filiere :</label>
            <input type="text" name="nom" onChange={(e)=>console.log(e.target.value)} style={{minWidth:"70%"}}></input>
          </div>
          <div className="my-3">
            <label htmlFor="capacite">Capacité :</label>
            <input type="number" name="capacite" min="1"></input>
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
                      <div className="d-flex justify-content-between  align-items-center mx-1 my-2" key={elt.id}>
                          <div>
                            <label htmlFor={elt.id}>Spécialité :</label>
                            <input type="text" id={elt.id}></input>
                          </div>
                        <div >
                            <label for="niveau">Niveau:</label>
                            <select name="niveau">
                                <option name="master">master</option>
                                <option name="doctorat">doctorat</option>
                                <option name="doctorat">Les deux</option>

                            </select>
                        </div>
                        <button type="button" className="btn btn-danger deleteSpeciality" onClick={e=>handleDelete(e,elt.id)}><BsTrash/></button>
                      </div>
                  )
              })
          }
        </div>
        <div className="my-4 d-flex justify-content-end " style={{width:"100%"}}>
          <button className="btn me-2 cancelButton" type="button" onClick={()=>navigate("/admin/dashboard")}>Annuler </button>
          <button className="btn addButton" type="button" >Ajouter</button>
        </div>
       
      </div>
    </section>
  )
}

export default AjoutFiliere