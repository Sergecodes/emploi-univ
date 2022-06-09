import React, { useState,useEffect} from "react";
import tableIcons from "../Common/MaterialTableIcons";
import MaterialTable from "material-table";
import { Modal, Box } from "@material-ui/core";
import AjoutEnseignant from "./Enseignants/AjoutEnseignant";
import SupprimerEnseignant from "./Enseignants/SupprimerEnseignant";
import ModifierEnseignant from "./Enseignants/ModifierEnseignant";
import { useSelector, useDispatch } from "react-redux";
import {
  handleOpenAjout,
  handleOpenDelete,
  handleOpenModify,
  handleOpenSnackbar,
} from "../../redux/ModalDisplaySlice";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ListeFilieres = () => {
  const [listeEnseignants, setListeEnseignants] = useState([{}]);
  const [enseignantInfo, setEnseignantInfo] = useState({ nom: "", capacite: "" });
  const columns = [
    { title: "Nom", field: "nom", align: "center" },
    { title: "Prenom", field: "prenom", align: "center" },
    { title: "Matricule", field: "matricule", align: "center" },
  ];
  const data = listeEnseignants;
  const dispatch = useDispatch();

  const handleModify = (data) => {
    let new_enseignantInfo = { nom: data.nom, prenom: data.prenom, matricule:data.matricule };
    setEnseignantInfo(new_enseignantInfo);
    dispatch(handleOpenModify());
  };

  const handleDelete = (data) => {
    let new_enseignantInfo = { nom: data.nom, prenom: data.prenom, matricule:data.matricule };
    setEnseignantInfo(new_enseignantInfo);
    dispatch(handleOpenDelete());
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

   const handleClose = ()=>{
    if(files.openSnackbar===true){
      dispatch(handleOpenSnackbar())
    }
  }


  const alertMessage = ()=>{
    if(files.alert.type==='success'){
      return( 
        <Alert onClose={()=>handleClose()} severity={"success"} sx={{ width: '100%' }}>
          Opération réussie
        </Alert>)
    }
    else{
      return(
        <Alert onClose={()=>handleClose()} severity={"error"} sx={{ width: '100%' }}>
          Une erreur est survenue lors de l'execution de l'opération
        </Alert>
      )
    }
   
  }

  const files = useSelector((state) => state.ModalDisplay);
  

  
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/enseignants/")
      .then((res) => setListeEnseignants(res.data))
      .catch((err) => console.log(err));
  }, [files.openAjout,files.openModify,files.openDelete]);


  return (
    <section className="materialTableSalle mx-2 my-3">
      <MaterialTable
        title="ENSEIGNANTS FACSCIENCES UY1"
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: "Modifier un enseignant",
            onClick: (event, data) => handleModify(data),
          },
          {
            icon: tableIcons.Delete,
            tooltip: "Supprimer un enseignant",
            onClick: (event, data) => handleDelete(data),
          },
          {
            icon: tableIcons.Add,
            tooltip: "Ajouter un enseignant",
            isFreeAction: true,
            onClick: () => dispatch(handleOpenAjout()),

          },
        ]}
        icons={tableIcons}
        columns={columns}
        data={data}
        options={{ paging: false, grouping: true }}
      />

      {/*snackbar */}
      <div>
      <Snackbar open={files.openSnackbar} autoHideDuration={6000} onClose={()=>handleClose()}>
         {alertMessage()}
      </Snackbar>
      </div>

      {/*Modal pour l'ajout d'un enseignant*/}
      <div>
        <Modal open={files.openAjout}>
          <Box>
            <AjoutEnseignant />
          </Box>
        </Modal>
      </div>

      {/*Modal pour la suppression d'un enseignant*/}
      <div>
        <Modal open={files.openDelete}>
          <Box>
            <SupprimerEnseignant matricule={enseignantInfo.matricule} />
          </Box>
        </Modal>
      </div>

      {/* Modal pour la suppression d'un enseignant */}
      <div>
        <Modal open={files.openModify}>
          <Box>
            <ModifierEnseignant enseignant={enseignantInfo} />
          </Box>
        </Modal>
      </div>
    </section>
  );
};

export default ListeFilieres;
