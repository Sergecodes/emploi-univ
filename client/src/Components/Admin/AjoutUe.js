import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
/*import Cookies from "js-cookie";*/
import axios from "axios";



const AjoutUe = () => {
    const navigate = useNavigate();
    const [listeFilieres, setListeFilieres]=useState([{}]);
   const [enseignant,setEnseignant]=useState([{}]);
   // const [niveau,setNiveau]=useState([{}])
  /*   const csrftoken = Cookies.get('csrftoken');

    const headers={
      'X-CSRFToken': csrftoken
    }*/

    useEffect(()=>{

       
      axios.get("http://localhost:8000/api/Filiere/all/")
      .then(res=>setListeFilieres(res.data))
      .catch(err=>console.log(err))

    /*  axios.get("http://localhost:8000/api/Niveau/all/")
      .then(res=>setNiveau(res.data))
      .catch(err=>console.log(err))*/

      axios.get("http://localhost:8000/api/Enseignant/all/")
      .then(res=>setEnseignant(res.data))
      .catch(err=>console.log(err))
      
    },[])


    const handleAjout=()=>{    
      for(let i in enseignant){
        console.log(enseignant[i])
      }
    }
  return (
    <section
      className="d-flex justify-content-center row"
      style={{ width: "100%" }}
    >
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-7">
        <h4 className="fs-5 fw-light text-center">
          Vous ètes sur le point d'ajouter une nouvelle UE à votre emploi
          de temps
        </h4>
        <div className="mt-4">
          <div className="my-3">
            <label htmlFor="nom">Code_Ue :</label>
            <input type="text" name="nom" style={{ minWidth: "70%" }}></input>
          </div>
          <div className="my-3">
            <label htmlFor="prenom">Intitulé :</label>
            <input
              type="text"
              name="prenom"
              style={{ minWidth: "70%" }}
            ></input>
          </div>
          <div className="my-3 d-flex align-items-center">
            <label htmlFor="matricule">matricule enseignant :</label>
            <Stack spacing={2} sx={{ minWidth:"280px",padding:"0px",margin:"0px"}}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={enseignant.map((option) => option.matricule)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="matricule"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            size="small"
          />
        )}
      />
    </Stack>
          </div>
          <div className="my-3">
            <label htmlFor="filiere">Filiere :</label>
            <select name="filiere">
            {
                listeFilieres.map((elt,index)=>{
                  return(
                  
                      <option key={index} name={elt.nom}>{elt.nom}</option>
      
                  )
                })
              }
            </select>
          </div>
          <div className="my-3">
            <label htmlFor="niveau">Niveau :</label>
            <select name="niveau">
              <option name="niveau1">Niveau 1</option>
            </select>
          </div>
          <div className="my-3">
            <label htmlFor="specialite">Specialite :</label>
            <select name="specialite">
              <option name="data-science">Data Science</option>
              <option name="genie-logiciel">doctorat</option>
            </select>
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
          <button className="btn addButton" type="button" onClick={handleAjout}>
            Ajouter
          </button>
        </div>
      </div>
    </section>
  );
};

export default AjoutUe;
