import React,{useState} from 'react';
import { Alert } from '@mui/material';
import{ handleOpenModify} from "../../../redux/ModalDisplaySlice";
import {useDispatch} from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";



const ModifierFiliere = (props) => {

  const [alert ,setAlert]=useState("none")
  const actual=props.filiere;
  const [updateFiliere, setUpdateFiliere] = useState(props.filiere);
  const dispatch = useDispatch();
  const csrftoken = Cookies.get('csrftoken');
  const headers={
    'X-CSRFToken': csrftoken
  }

  const handleUpdate=()=>{
    if(actual.nom===updateFiliere.nom ){
      setAlert("warning")
    }
    else{
        setAlert("none")
      axios({
        method:'put',
        url:`http://localhost:8000/api/filieres/${encodeURIComponent(actual.nom)}/`,
        data:{new_nom:updateFiliere},
        headers:headers,
        withCredentials:true
      })
      .then(res=>console.log(res))
      .catch(err=>console.error(err))
    }
  }

  return (
            <div
              className="d-flex justify-content-center row"
              style={{ width: "100%" }}
            >
              <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-6">
                <h4 className="fs-5 fw-light text-center">
                  Modification des informations concernant une filiere
                 <div className="my-2">
                   {/* <Alert severity="error">This is an error alert — check it out!</Alert>
<Alert severity="warning">This is a warning alert — check it out!</Alert>
<Alert severity="info">This is an info alert — check it out!</Alert>
<Alert severity="success">This is a success alert — check it out!</Alert> */}
                  <Alert severity="warning" style={alert!=="warning"?{display:"none"}:{}}>Veuillez effectuez un changement avant de cliquer sur modifier</Alert>
                 </div>
                </h4>
                <div className="mt-4">
                  <div className="my-3">
                    <label htmlFor="nom">Nom de la filiere :</label>
                    <input
                      type="text"
                      name="nom"
                      style={{ minWidth: "70%" }}
                      value={updateFiliere.nom}
                      onChange={(e)=>setUpdateFiliere(e.target.value)}
                    ></input>
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
  )
}

export default ModifierFiliere