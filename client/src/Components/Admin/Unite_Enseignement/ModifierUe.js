import React,{useState} from "react";
import TextField from '@mui/material/TextField';
import { Alert } from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";
import {useDispatch} from "react-redux";
import{ handleOpenModify,handleOpenSnackbar,handleAlert} from "../../../redux/ModalDisplaySlice";



const ModifierUe = (props) => {
  const [alert, setAlert] = useState("none");
   const actual = props.ue;
   const [updateUe, setUpdateUe]=useState(props.ue) 
   const dispatch = useDispatch()
  const csrftoken = Cookies.get('csrftoken');

    const headers={
      'X-CSRFToken': csrftoken
    }


    const handleChange=(e)=>{
      const name= e.target.name;
        const value=e.target.value;
      setUpdateUe({...updateUe, [name]:value})
    }

    const handleUpdate=()=>{    
        if(actual === updateUe){
          setAlert("warning")
        }
        else{
          setAlert('none')
          axios({
            method:'put',
            url:`http://localhost:8000/api/ue/${encodeURIComponent(actual.code)}/`,
            data:{new_code:updateUe.code, intitule:updateUe.intitule},
            headers:headers,
            withCredentials:true
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
            <input type='text' name="nom_filiere" defaultValue={props.ue.nom_filiere} disabled={true}/>
          </div>
          <div className="my-3">
            <label htmlFor="nom_niveau">Niveau :</label>
            <input type='text' name="nom_niveau"  defaultValue={props.ue.nom_niveau} disabled={true}/>
          </div>
          <div className="my-3 d-flex">
          <label htmlFor="nom_specialite">Specialite :</label>
            <input type='text' name="nom_specialite" defaultValue={props.ue.nom_specialite} disabled={true}/>
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

