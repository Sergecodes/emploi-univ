import React from 'react';
import {useDispatch} from "react-redux";
import{ handleOpenDelete} from "../../../redux/ModalDisplaySlice";
import { Delete } from '@material-ui/icons';
import axios from "axios";
import Cookies from "js-cookie";

const SupprimerGroupe = (props) => {
 
    const dispatch = useDispatch();
    const csrftoken = Cookies.get('csrftoken');
  const headers={
    'X-CSRFToken': csrftoken
  }

    const handleDelete=()=>{
      axios({
        method:'delete',
        url:`http://localhost:8000/api/groupes/${encodeURIComponent(props.groupeInfo.groupe)}`,
        data:props.groupeInfo,
        headers:headers,
        withCredentials:true
      })
      .then(res=>console.log(res))
      .catch(err=>console.error(err))
  //  dispatch(handleOpenDelete());
  console.log(props.groupeInfo)
    }
   
  return (

           <section>
                <div
              className="d-flex justify-content-center  row"
              style={{ width: "100%" }}
            >
              <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-6">
                <h4 className="fs-5 fw-light text-center">
                  Voulez vous vraiment Supprimer le groupe '{props.groupeInfo.groupe}' de {props.groupeInfo.nom_niveau} de la filiere {props.groupeInfo.nom_filiere}?
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