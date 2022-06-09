import React,{useState} from 'react';
import { Alert } from '@mui/material';
import{ handleOpenModify,handleOpenSnackbar, handleAlert} from "../../../redux/ModalDisplaySlice";
import {useDispatch} from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";



const ModifierSpecialite = (props) => {
  const [alert ,setAlert]=useState("none")
  const actual=props.specialite;
  const [updateSpecialite, setUpdateSpecialite] = useState(props.specialite);
  const dispatch = useDispatch();
  const csrftoken = Cookies.get('csrftoken');
  const headers={
    'X-CSRFToken': csrftoken
  }

  const handleUpdate=()=>{
    if(actual===updateSpecialite ){
      setAlert("warning")
    }
    else{
        setAlert("none")
     axios({
        method:'put',
        url:`http://localhost:8000/api/specialites/${encodeURIComponent(actual)}/`,
        data:{new_nom:updateSpecialite},
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
            <div
              className="d-flex justify-content-center row"
              style={{ width: "100%" }}
            >
              <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-6">
                <h4 className="fs-5 fw-light text-center">
                  Modification des informations concernant une spécialité
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
                    <label htmlFor="nom">Nom de la specialite :</label>
                    <input
                      type="text"
                      name="nom"
                      style={{ minWidth: "70%" }}
                      value={updateSpecialite}
                      onChange={(e)=>setUpdateSpecialite(e.target.value)}
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

export default ModifierSpecialite