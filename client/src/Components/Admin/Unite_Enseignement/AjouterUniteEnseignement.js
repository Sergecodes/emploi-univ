import React,{useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import Cookies from "js-cookie";
import axios from "axios";
import {useDispatch} from "react-redux";
import{ handleOpenAjout,handleOpenSnackbar, handleAlert} from "../../../redux/ModalDisplaySlice";

const AjouterUniteEnseignement = () => {
  
    const [listeFilieres, setListeFilieres]=useState([]);
   const [listeNiveaux,setListeNiveaux]=useState([])
   const [listeSpecialites, setListeSpecialites]=useState([])
   const [activate ,setActivate] =useState(true)
   const [ueInfo, setUeInfo]=useState({
    code:"",
    intitule:"",
    nom_filiere:"",
    nom_niveau:"",
    nom_specialite:""
  }) 
   const dispatch = useDispatch()
   //const [niveau,setNiveau]=useState([{}])
    const csrftoken = Cookies.get('csrftoken');

    const headers={
      'X-CSRFToken': csrftoken
    }

    useEffect(()=>{
      const axiosLinks =[
        'http://localhost:8000/api/filieres/',
        'http://localhost:8000/api/niveaux/'
      ]
      Promise.all(axiosLinks.map((link) => axios.get(link)))
      .then(
        axios.spread((...allData) => {
          setListeFilieres(allData[0].data);
          setListeNiveaux(allData[1].data);
          setUeInfo(prevState=>({...prevState,nom_niveau:allData[1].data[0].nom_bref,nom_filiere:allData[0].data[0].nom}));
        }))
        .catch(err=>console.log(err))
  
    },[])

    useEffect(()=>{
      if(ueInfo.nom_filiere!=="" && ueInfo.nom_niveau!==""){
        axios
      .get(`http://localhost:8000/api/specialites/${ueInfo.nom_filiere}/${ueInfo.nom_niveau}`)
      .then((res) =>{setListeSpecialites(res.data); if(res.data.length!==0){
      
        setUeInfo(prevState=>({...prevState, nom_specialite:res.data[0].nom_specialite}))
      }})
      .catch((err) => console.log(err));
      }
      
    },[ueInfo.nom_filiere, ueInfo.nom_niveau])

    const handleChange=(e)=>{
      const name= e.target.name;
        const value=e.target.value;
      setUeInfo({...ueInfo, [name]:value})
    }

    const handleAjout=()=>{    
      const newUeInfo = {...ueInfo};
      if(!activate || (activate && listeSpecialites.length===0)){
        newUeInfo.nom_specialite=null;
      }
      console.log(newUeInfo)
      axios({
        method:'post',
        url:"http://localhost:8000/api/ue/",
        data:newUeInfo,
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
                listeNiveaux.map((elt,index)=>{
                 return(
                  <option  key={index} name={elt.nom_bref}>{elt.nom_bref}</option>
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
                listeSpecialites.map((elt,index)=>{
                  return(
                    <option  key={index} name={elt.nom_specialite}>{elt.nom_specialite}</option>
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

export default AjouterUniteEnseignement;

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