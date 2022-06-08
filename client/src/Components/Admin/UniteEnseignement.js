import React, { useState,useEffect} from "react";
import tableIcons from "../Common/MaterialTableIcons";
import MaterialTable from "material-table";
import { Modal, Box } from "@material-ui/core";
import AjouterUe from "./Unite_Enseignement/AjouterUe";
import SupprimerUe from "./Unite_Enseignement/SupprimerUe";
import ModifierUe from "./Unite_Enseignement/ModifierUe";
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

const UniteEnseignement = () => {
  const [listeUe, setListeUe] = useState([
  ]);
  const [ueInfo, setUeInfo] = useState({  });
  const columns = [
    { title: "Code", field: "code", align: "center" },
    { title: "Intitule", field: "intitule", align: "center" },
    { title: "Nom filiere", field: "nom_filiere", align: "center" },
    { title: "Nom niveau", field: "nom_niveau", align: "center" },
    { title: "Nom specialite", field: "nom_specialite", align: "center" },

  ];

  const dispatch = useDispatch();
  const data = listeUe;
  const handleModify = (data) => {
    let new_ueInfo = { code:data.code, intitule:data.intitule, nom_filiere:data.nom_filiere, nom_niveau:data.nom_niveau ,nom_specialite:data.nom_specialite};
    setUeInfo(new_ueInfo);
    dispatch(handleOpenModify());
  };

  const handleDelete = (data) => {
    let new_ueInfo = { code:data.code, intitule:data.intitule, nom_filiere:data.nom_filiere, nom_niveau:data.nom_niveau ,nom_specialite:data.nom_specialite};
    setUeInfo(new_ueInfo);
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
      .get("http://localhost:8000/api/ue/")
      .then((res) => setListeUe(res.data))
      .catch((err) => console.log(err));
  }, [files.openAjout,files.openModify,files.openDelete]);


  return (
    <section className="materialTableSalle mx-2 my-3">
      <MaterialTable
        title="UE FACSCIENCES UY1"
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: "Modifier une UE",
            onClick: (event, data) => handleModify(data),
          },
          {
            icon: tableIcons.Delete,
            tooltip: "Supprimer une UE",
            onClick: (event, data) => handleDelete(data),
          },
          {
            icon: tableIcons.Add,
            tooltip: "Ajouter une UE",
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

      {/*Modal pour l'ajout d'une ue*/}
      <div>
        <Modal open={files.openAjout}>
          <Box>
            <AjouterUe />
          </Box>
        </Modal>
      </div>

      {/*Modal pour la suppression d'une ue */}
      <div>
        <Modal open={files.openDelete}>
          <Box>
            <SupprimerUe  ue={ueInfo} />
          </Box>
        </Modal>
      </div>

      {/* Modal pour la suppression d'une ue*/}
      <div>
        <Modal open={files.openModify}>
          <Box>
            <ModifierUe  ue={ueInfo}/>
          </Box>
        </Modal>
      </div>
    </section>
  );
};

export default UniteEnseignement;



