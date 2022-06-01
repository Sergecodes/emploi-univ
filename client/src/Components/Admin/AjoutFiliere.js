import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import {BsTrash, BsPlus} from "react-icons/bs";
import Alert from '@mui/material/Alert';
//import axios from "axios";
//import Cookies from "js-cookie"


const AjoutFiliere = () => {

    const [specialite,setSpecialite]= useState([])
    const [filiere,setFiliere]=useState("");
    const navigate = useNavigate();
    const [alert,setAlert]=useState("none");
    /*const csrftoken = Cookies.get('csrftoken');

    const headers={
      'X-CSRFToken': csrftoken
    }*/

    const handleClick=()=>{
        setSpecialite([...specialite,{id:specialite.length ,nom:" ",licence:false, master:false}])
    }

    const handleDelete=(e,id)=>{
        const new_specialite= specialite.filter(elt=>elt.id!==id);
        setSpecialite(new_specialite)
    }

   
    const handleInputChange=(e,id)=>{
       const new_specialite= [...specialite];
      new_specialite[id].nom=e.target.value;
      setSpecialite(new_specialite)
    }
    
    const handleCheckboxChange=(nom,id)=>{
      const new_specialite= [...specialite];
      new_specialite[id][nom]=!(new_specialite[id][nom]);
      setSpecialite(new_specialite)
    }

    const verification=()=>{
      let valeur=true;
      if(specialite.length===0 || filiere.trim().length===0){
        return false;
      }
      else{
        for(let i in specialite){
          if((specialite[i].licence===false &&specialite[i].master===false) ||specialite[i].nom.trim().length ===0 ){
            valeur =false;
          }
        }
        if(valeur===true &&filiere.trim().length===0){
          valeur =false;
        }
        return valeur;
      }
     
    }

    const handleAjout=()=>{
      
      if(verification()===true){
        setAlert("none")
        /*let axiosDataSend={ nom_filiere:filiere, specialites:specialite}
        console.log(axiosDataSend)*/
       /* axios({
          method:'post',
          url:"http://localhost:8000/api/filieres/",
          data:{"nom":filiere},
          headers:headers,
          withCredentials:true
        })
        .then(res=>console.log(res))
        .catch(err=>console.error(err))
        
        axios({
          method:'post',
          url:"http://localhost:8000/api/specialites/",
          data:{"nom_filiere":"Chimie","specialites":[{nom:"Chimie appliquée",master:true, licence:true}]},
          headers:headers,
          withCredentials:true
        })
        .then(res=>console.log(res))
        .catch(err=>console.error(err))*/
      }
      else{
        setAlert('input')
      }
    /* axios({
        method:'post',
        url:"http://localhost:8000/api/filieres/",
        data:{"nom":filiere},
        headers:headers,
        withCredentials:true
      })
      .then(res=>console.log(res))
      .catch(err=>console.error(err))*/
      

   /*   axios({
        method:'post',
        url:"http://localhost:8000/api/specialites/",
        data:{"nom_filiere":"Chimie","specialites":[{nom:"Chimie appliquée",master:true, licence:true}]},
        headers:headers,
        withCredentials:true
      })
      .then(res=>console.log(res))
      .catch(err=>console.error(err))
      axios.get('http://localhost:8000/api/specialites/')
      .then(res=>console.log(res))
      .catch(err=>console.error(err))*/
     
     
      



    }



   
  return (
    <section
      className="d-flex justify-content-center row"
      style={{ width: "100%" }}
    >
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-7">
        <h4 className="fs-5 fw-light text-center">
          Vous ètes sur le point d'ajouter des informations relatives à une nouvelle filière dans votre emploi de temps
        </h4>
        <div className="my-2">
                   {/* <Alert severity="error">This is an error alert — check it out!</Alert>
<Alert severity="warning">This is a warning alert — check it out!</Alert>
<Alert severity="info">This is an info alert — check it out!</Alert>
<Alert severity="success">This is a success alert — check it out!</Alert> */}
                  <Alert severity="warning" style={alert!=="input"?{display:"none"}:{}}>Veuillez renseigner tous les champs qui vont été demandé</Alert>
        </div>
        <div className="mt-4">
          <div className="my-3">
            <label htmlFor="nom">Nom filiere :</label>
            <input type="text" name="nom" onChange={e=>setFiliere(e.target.value)} style={{minWidth:"70%"}}></input>
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
        <div className="my-4 d-flex justify-content-end " style={{width:"100%"}}>
          <button className="btn me-2 cancelButton" type="button" onClick={()=>navigate("/admin/dashboard")}>Annuler </button>
          <button className="btn addButton" type="button" onClick={handleAjout} >Ajouter</button>
        </div>
       
      </div>
    </section>
  )
}

export default AjoutFiliere