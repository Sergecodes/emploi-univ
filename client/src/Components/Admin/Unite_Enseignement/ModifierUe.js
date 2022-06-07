import React,{useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import { Alert } from "@mui/material";
/*import Cookies from "js-cookie";*/
import axios from "axios";
import {useDispatch} from "react-redux";
import{ handleOpenModify} from "../../../redux/ModalDisplaySlice";



const ModifierUe = (props) => {
  const [alert, setAlert] = useState("none");
    const [listeFilieres, setListeFilieres]=useState([{}]);
   const niveaux =[{nom:'niveau 1'},{nom:'niveau 2'},{nom:'niveau 3'}];
   const specialites =[{nom:'data science'},{nom:'genie logiciel'},{nom:'reseaux'}];
   const actual = props.ue;
   const [activate ,setActivate] =useState(props.ue.nom_specialite.trim().length===0?false:true)
   const [updateUe, setUpdateUe]=useState(props.ue) 
   const dispatch = useDispatch()
   // const [niveau,setNiveau]=useState([{}])
  /*   const csrftoken = Cookies.get('csrftoken');

    const headers={
      'X-CSRFToken': csrftoken
    }*/

    useEffect(()=>{

       
      axios.get("http://localhost:8000/api/filieres/")
      .then(res=>setListeFilieres(res.data))
      .catch(err=>console.log(err))

    /*  axios.get("http://localhost:8000/api/Niveau/all/")
      .then(res=>setNiveau(res.data))
      .catch(err=>console.log(err))*/

      
    },[])

    const handleChange=(e)=>{
      const name= e.target.name;
        const value=e.target.value;
      setUpdateUe({...updateUe, [name]:value})
    }

    const handleUpdate=()=>{    
        console.log(actual,updateUe)
    }
  return (
    <section
      className="d-flex justify-content-center row"
      style={{ width: "100%" }}
    >
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-7">
        <h4 className="fs-5 fw-light text-center">
          Modification des informations concernant l'ue {props.ue.code}
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
          <div className="my-3 d-flex align-items-center">
            <label htmlFor="code">Code_Ue :</label>
            <TextField name="code" label="code" size='small' value={updateUe.code} onChange={handleChange}/>
          </div>
          <div className="my-3 d-flex align-items-center">
            <label htmlFor="intitule">Intitulé :</label>
            <TextField name="intitule" label="intitule" size='small' value={updateUe.intitule} onChange={handleChange}/>
          </div>
         
          <div className="my-3">
            <label htmlFor="nom_filiere">Filiere :</label>
            <select name="nom_filiere" onChange={handleChange} >
            {
                listeFilieres.map((elt,index)=>{
                  return(
                  
                      <option key={index} name={elt.nom} selected={updateUe.nom_filiere===elt.nom?true:false}>{elt.nom}</option>
      
                  )
                })
              }
            </select>
          </div>
          <div className="my-3">
            <label htmlFor="nom_niveau">Niveau :</label>
            <select name="nom_niveau" onChange={handleChange}  >
              {
                niveaux.map((elt,index)=>{
                 return(
                  <option  key={index} name={elt.nom} selected={updateUe.nom_niveau===elt.nom?true:false}>{elt.nom}</option>
                 )
                })
              }
            </select>
          </div>
          <div className="my-3 d-flex">
              <div>
              <label htmlFor="nom_specialite" style={activate?{}:{color:"GrayText"}} >Specialite :</label>
            <select name="nom_specialite" onChange={handleChange} disabled={!activate}>
              {
                specialites.map((elt,index)=>{
                  return(
                    <option  key={index} name={elt.nom}  selected={updateUe.nom_specialite===elt.nom?true:false}>{elt.nom}</option>
                  )
                })
              }
            </select>
              </div>
              <div className="ms-4">
                <input type="checkbox" name="activate"  checked={activate} onChange={()=>setActivate(!activate)}/>
              </div>
          </div>
        </div>
        <div
          className="my-3 d-flex justify-content-end "
          style={{ width: "100%" }}
        >
          <button
            className="btn me-2 cancelButton"
            type="button"
            onClick={() => dispatch(handleOpenModify())}
          >
            Annuler{" "}
          </button>
          <button className="btn addButton" type="button" onClick={handleUpdate}>
            Ajouter
          </button>
        </div>
      </div>
    </section>
  );
};

export default ModifierUe;

