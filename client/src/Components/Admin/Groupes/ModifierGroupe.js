import React, { useState } from "react";
import { Alert } from "@mui/material";
import { handleOpenModify,handleOpenSnackbar, handleAlert } from "../../../redux/ModalDisplaySlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

const ModifierGroupe = (props) => {
  const [alert, setAlert] = useState("none");
  const modified=  {nom_filiere:props.groupeInfo.nom_filiere.nom, nom_niveau:props.groupeInfo.nom_niveau.nom_bref,nom_specialite:props.groupeInfo.nom_specialite===null?null:props.groupeInfo.nom_specialite.nom,new_nom:props.groupeInfo.new_nom.nom};
  const actual = modified;
  const [updateGroupe, setUpdateGroupe] = useState( modified);
  const dispatch = useDispatch();
  const csrftoken = Cookies.get("csrftoken");
  const headers = {
    "X-CSRFToken": csrftoken,
  };


  

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
      .then(res=>{
        dispatch(handleOpenModify());
        dispatch(handleOpenSnackbar())
        if(res.status===200){
          dispatch(handleAlert({type : "success"}))
        }
        else{
          dispatch(handleAlert({type : "error"}));
        }
       
       
      })
      .catch(err=>{
        dispatch(handleOpenModify());
        dispatch(handleOpenSnackbar());
        dispatch(handleAlert({type : "error"}));
      })
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
        <div className="my-3">
            <label htmlFor="nom_filiere">Filiere :</label>
            <input type='text' name="nom_filiere" defaultValue={updateGroupe.nom_filiere} disabled={true}/>
          </div>
          <div className="my-3">
            <label htmlFor="nom_niveau">Niveau :</label>
            <input type='text' name="nom_niveau"  defaultValue={updateGroupe.nom_niveau} disabled={true}/>
          </div>
          <div className="my-3 d-flex">
          <label htmlFor="nom_specialite">Specialite :</label>
            <input type='text' name="nom_specialite" defaultValue={updateGroupe.nom_specialite} disabled={true}/>
          </div>
          <div className="my-3 d-flex align-items-center">
            <label htmlFor="new_nom">Groupe :</label>
              <input type="text" name="new_nom" value={updateGroupe.new_nom} onChange={e=>handleChange(e)}  style={{ minWidth: "70%" }}/>
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
