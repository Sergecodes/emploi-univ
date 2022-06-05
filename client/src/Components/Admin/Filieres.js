import React, { useState,useEffect} from "react";
import tableIcons from "../Common/MaterialTableIcons";
import MaterialTable from "material-table";
import { Modal, Box } from "@material-ui/core";
import AjoutFiliere from "./Filieres/AjoutFiliere";
import SupprimerFiliere from "./Filieres/SupprimerFiliere";
import ModifierFiliere from "./Filieres/ModifierFiliere";
import { useSelector, useDispatch } from "react-redux";
import {
  handleOpenAjout,
  handleOpenDelete,
  handleOpenModify,
  handleOpenSnackbar,
  handleAlert
} from "../../redux/ModalDisplaySlice";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



import axios from "axios";

const Filieres = () => {
  const [listeFilieres, setListeFilieres] = useState([{}
  ]);
  const [filiereInfo, setFiliereInfo] = useState({ nom: ""});

  const data = listeFilieres;
  const columns = [
    { title: "Nom", field: "nom", align: "center" }
  ];

  const dispatch = useDispatch();

  const handleModify = (data) => {
    let new_filiereInfo = { nom: data.nom };
    setFiliereInfo(new_filiereInfo);
    dispatch(handleOpenModify());
  };

  const handleDelete = (data) => {
    let new_filiereInfo = { nom: data.nom };
    setFiliereInfo(new_filiereInfo);
    dispatch(handleOpenDelete());
  };

  const files = useSelector((state) => state.ModalDisplay);
  
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
  
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/filieres/")
      .then((res) =>  setListeFilieres(res.data))
      .catch((err) => console.log(err));

  }, [files.openAjout,files.openModify,files.openDelete]);

  return (
    <section className="materialTableSalle mx-2 my-3">
      <MaterialTable
        title="DIFFERENTES FILIERES DE L'UNIVERSITE"
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: "Modifier une filiere",
            onClick: (event, data) => handleModify(data),
          },
          {
            icon: tableIcons.Delete,
            tooltip: "Supprimer une filiere",
            onClick: (event, data) => handleDelete(data),
          },
          {
            icon: tableIcons.Add,
            tooltip: "Ajouter une filiere",
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

      {/*Modal pour l'ajout d'une salle*/}
      <div>
        <Modal open={files.openAjout}>
          <Box>
            <AjoutFiliere />
          </Box>
        </Modal>
      </div>

      {/*Modal pour la suppression d'une salle*/}
      <div>
        <Modal open={files.openDelete}>
          <Box>
            <SupprimerFiliere nom={filiereInfo.nom} />
          </Box>
        </Modal>
      </div>

      {/* Modal pour la suppression d'une salle */}
      <div>
        <Modal open={files.openModify}>
          <Box>
            <ModifierFiliere filiere={filiereInfo} />
          </Box>
        </Modal>
      </div>
    </section>
  );
};

export default Filieres;
