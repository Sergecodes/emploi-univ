import React from 'react';
import {useDispatch} from "react-redux";
import{ handleOpenDelete,handleOpenSnackbar, handleAlert} from "../../../redux/ModalDisplaySlice";
import { Delete } from '@material-ui/icons';
import axios from "axios";
import Cookies from "js-cookie";

const SupprimerGroupe = (props) => {
  const groupeInfo = props.groupeInfo;
  if(groupeInfo.nom_specialite===null){
    console.log("null")
  }
  else{
    console.log("not null")
  }
 
    const dispatch = useDispatch();
    const csrftoken = Cookies.get('csrftoken');
  const headers={
    'X-CSRFToken': csrftoken
  }

    const handleDelete=()=>{
      let newData ={};
      if(groupeInfo.nom_specialite===null)
      {
        newData={nom_niveau:groupeInfo.nom_niveau.nom_bref, nom_filiere:groupeInfo.nom_filiere.nom}
      }
      else{
        newData= {nom_niveau:groupeInfo.nom_niveau.nom_bref, nom_filiere:groupeInfo.nom_filiere.nom,nom_specialite:groupeInfo.nom_specialite.nom}
      }
      axios({
        method:'delete',
        url:`http://localhost:8000/api/groupes/${encodeURIComponent(groupeInfo.groupe.nom)}`,
        data:newData,
        headers:headers,
        withCredentials:true
      })
      .then(res=>{
        dispatch(handleOpenDelete());
        dispatch(handleOpenSnackbar())
        if(res.status===204){
          dispatch(handleAlert({type : "success"}))
        }
        else{
          dispatch(handleAlert({type : "error"}));
        }
       
       
      })
      .catch(err=>{
        dispatch(handleOpenDelete());
        dispatch(handleOpenSnackbar());
        dispatch(handleAlert({type : "error"}));
      })
  //  dispatch(handleOpenDelete());
    }
   
  return (

           <section>
                <div
              className="d-flex justify-content-center  row"
              style={{ width: "100%" }}
            >
              <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-6">
                <h4 className="fs-5 fw-light text-center">
                  Voulez vous vraiment Supprimer le groupe '{props.groupeInfo.groupe.nom}' de {props.groupeInfo.nom_niveau.nom_bref} de la filiere {props.groupeInfo.nom_filiere.nom}?
                </h4>
                <div
                  className="my-4 d-flex justify-content-center "
                  style={{ width: "100%" }}
                >
                  <button
                    className="btn me-2 cancelButton"
                    type="button"
                    onClick={() => dispatch(handleOpenDelete())}
                  >
                    Annuler{" "}
                  </button>
                  <button className="btn btn-danger " type="button" onClick={handleDelete}>
                    <Delete /> Supprimer
                  </button>
                </div>
              </div>
            </div>
           </section>
       
  )
}

export default SupprimerGroupe