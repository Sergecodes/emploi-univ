import React,{useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
/*import Cookies from "js-cookie";*/
import axios from "axios";
import {useDispatch} from "react-redux";
import{ handleOpenAjout} from "../../../redux/ModalDisplaySlice";



const AjouterUe = () => {
  
    const [listeFilieres, setListeFilieres]=useState([{}]);
   const niveaux =[{nom:'niveau 1'},{nom:'niveau 2'},{nom:'niveau 3'}];
   const specialites =[{nom:'data science'},{nom:'genie logiciel'},{nom:'reseaux'}];
   const [activate ,setActivate] =useState(true)
   const [ueInfo, setUeInfo]=useState({
    code:"",
    intitule:" ",
    nom_filiere:" ",
    nom_niveau:niveaux[0].nom,
    nom_specialite:specialites[0].nom
  }) 
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
      setUeInfo({...ueInfo, [name]:value})
    }

    const handleAjout=()=>{    
     console.log(ueInfo)
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
          <div className="my-3 d-flex align-items-center">
            <label htmlFor="code">Code_Ue :</label>
            <TextField name="code" label="code" size='small' onChange={handleChange}/>
          </div>
          <div className="my-3 d-flex align-items-center">
            <label htmlFor="intitule">Intitulé :</label>
            <TextField name="intitule" label="intitule" size='small' onChange={handleChange}/>
          </div>
         
          <div className="my-3">
            <label htmlFor="nom_filiere">Filiere :</label>
            <select name="nom_filiere" onChange={handleChange}>
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
            <label htmlFor="nom_niveau">Niveau :</label>
            <select name="nom_niveau" onChange={handleChange}>
              {
                niveaux.map((elt,index)=>{
                 return(
                  <option  key={index} name={elt.nom}>{elt.nom}</option>
                 )
                })
              }
            </select>
          </div>
          <div className="my-3 d-flex">
              <div>
              <label htmlFor="nom_specialite" style={activate?{}:{color:"GrayText"}}>Specialite :</label>
            <select name="nom_specialite" onChange={handleChange} disabled={!activate}>
              {
                specialites.map((elt,index)=>{
                  return(
                    <option  key={index} name={elt.nom}>{elt.nom}</option>
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

export default AjouterUe;

/*
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';


      axios.get("http://localhost:8000/api/enseignants/")
      .then(res=>setEnseignant(res.data))
      .catch(err=>console.log(err))


  const [enseignant,setEnseignant]=useState([{}]);
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
            onChange={handleChange}
          />
        )}
      />
    </Stack>
          </div>*/