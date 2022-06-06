import React, { useState,useEffect } from "react";
import { Alert } from "@mui/material";
import { handleOpenModify } from "../../../redux/ModalDisplaySlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

const ModifierGroupe = (props) => {
  const [alert, setAlert] = useState("none");
  const actual = props.groupeInfo;
  const [listeFilieres, setListeFilieres]= useState([]);
  const [listeNiveaux, setListeNiveaux]= useState([]);
  const [listeSpecialites, setListeSpecialites]=useState([]);
  const [activate,setActivate]=useState(true);
  const [updateGroupe, setUpdateGroupe] = useState(props.groupeInfo);
  const dispatch = useDispatch();
  const csrftoken = Cookies.get("csrftoken");
  const headers = {
    "X-CSRFToken": csrftoken,
  };


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
        setUpdateGroupe(prevState=>({...prevState,nom_niveau:allData[1].data[0].nom_bref,nom_filiere:allData[0].data[0].nom}));
      }))
      .catch(err=>console.log(err))

  },[])

  useEffect(()=>{
    if(updateGroupe.nom_filiere!=="" && updateGroupe.nom_niveau!==""){
      axios
    .get(`http://localhost:8000/api/specialites/${updateGroupe.nom_filiere}/${updateGroupe.nom_niveau}`)
    .then((res) =>{setListeSpecialites(res.data); if(res.data.length!==0){
      setUpdateGroupe(prevState=>({...prevState, nom_specialite:res.data[0].nom_specialite}))
    }})
    .catch((err) => console.log(err));
    }
    
  },[updateGroupe.nom_filiere, updateGroupe.nom_niveau])

  const handleUpdate = () => {
    if (actual === updateGroupe) {
      setAlert("warning");
    } else {
      setAlert("none");
      axios({
        method: "put",
        url: `http://localhost:8000/api/groupes/${encodeURIComponent(
          actual.new_nom
        )}/`,
        data:updateGroupe,
        headers: headers,
        withCredentials: true,
      })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
    console.log(updateGroupe)
  };

  const handleChange=(e,id)=>{
   const name= e.target.name;
   const value=e.target.value;
   setUpdateGroupe({...updateGroupe, [name]:value})
   
 }

  return (
    <div
      className="d-flex justify-content-center row"
      style={{ width: "100%" }}
    >
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-6">
        <h4 className="fs-5 fw-light text-center">
          Modification des informations concernant le groupe
          <div className="my-2">
            {/* <Alert severity="error">This is an error alert — check it out!</Alert>
<Alert severity="warning">This is a warning alert — check it out!</Alert>
<Alert severity="info">This is an info alert — check it out!</Alert>
<Alert severity="success">This is a success alert — check it out!</Alert> */}
            <Alert
              severity="warning"
              style={alert !== "warning" ? { display: "none" } : {}}
            >
              Veuillez effectuez un changement avant de cliquer sur modifier
            </Alert>
          </div>
        </h4>
        <div className="mt-4">
          <div className="my-4 d-flex justify-content-center ">
            <label htmlFor="nom_filiere">Filiere :</label>
            <select name="nom_filiere" onChange={(e) => handleChange(e)}>
              {listeFilieres.map((elt, index) => {
                return (
                  <option key={index} name={elt.nom} >
                    {elt.nom}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-4 d-flex justify-content-center ">
            <label htmlFor="nom_niveau">Niveau :</label>
            <select name="nom_niveau" onChange={e=>handleChange(e)}>
            {
                listeNiveaux.map((elt,index)=>{
                  return(
                  
                      <option key={index} name={elt.nom_bref} >{elt.nom_bref}</option>
      
                  )
                })
              }
            </select>
          </div>
          <div className="my-4 d-flex justify-content-center align-items-center ">
            <label
              htmlFor="nom_specialite"
              style={activate === true ? { color: "GrayText" } : {}}
            >
              Specialite :
            </label>
            <select
              name="nom_specialite"
              onChange={(e) => handleChange(e)}
              disabled={activate}
            >
              {listeSpecialites.map((elt, index) => {
                return (
                  <option key={index} name={elt.nom_specialite} >
                    {elt.nom_specialite}
                  </option>
                );
              })}
            </select>
            <input
              type="checkbox"
              className="ms-3"
              value={activate}
              onChange={() => setActivate(!activate)}
            />
          </div>
          <div className="my-3 d-flex align-items-center">
            <label htmlFor="new_nom">Groupe :</label>
              <input type="text" name="new_nom" value={updateGroupe.new_nom} onChange={e=>handleChange(e)}  style={{ minWidth: "70%" }}/>
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
          <button
            className="btn addButton"
            type="button"
            onClick={handleUpdate}
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifierGroupe;
