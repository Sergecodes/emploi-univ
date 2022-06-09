import React, { useState,useEffect} from "react";
import tableIcons from "../Common/MaterialTableIcons";
import MaterialTable from "material-table";
import { Modal, Box } from "@material-ui/core";
import AjoutSalle from "./Salles/AjoutSalle";
import SupprimerSalle from "./Salles/SupprimerSalle";
import ModifierSalle from "./Salles/ModifierSalle";
import { useSelector, useDispatch } from "react-redux";
import {
  handleOpenAjout,
  handleOpenDelete,
  handleOpenModify,
  handleOpenSnackbar
} from "../../redux/ModalDisplaySlice";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Salles = () => {
  const [listeSalles, setListeSalles] = useState([{}
  ]);
  const [salleInfo, setSalleInfo] = useState({ nom: "", capacite: "" });

  const data = listeSalles;
  const columns = [
    { title: "Nom", field: "nom", align: "center" },
    { title: "Capacite", field: "capacite", align: "center" },
  ];

  const dispatch = useDispatch();

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

  const handleModify = (data) => {
    let new_salleInfo = { nom: data.nom, capacite: data.capacite };
    setSalleInfo(new_salleInfo);
    dispatch(handleOpenModify());
  };

  const handleDelete = (data) => {
    let new_salleInfo = { nom: data.nom, capacite: data.capacite };
    setSalleInfo(new_salleInfo);
    dispatch(handleOpenDelete());
  };

  const files = useSelector((state) => state.ModalDisplay);
  

  
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/salles/")
      .then((res) => setListeSalles(res.data))
      .catch((err) => console.log(err));
  }, [files.openAjout,files.openModify,files.openDelete]);


  return (
    <section className="materialTableSalle mx-2 my-3">
      <MaterialTable
        title="DIFFERENTES SALLES DE L'UNIVERSITE"
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: "Modifier une salle",
            onClick: (event, data) => handleModify(data),
          },
          {
            icon: tableIcons.Delete,
            tooltip: "Supprimer une salle",
            onClick: (event, data) => handleDelete(data),
          },
          {
            icon: tableIcons.Add,
            tooltip: "Ajouter une salle",
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
            <AjoutSalle />
          </Box>
        </Modal>
      </div>

      {/*Modal pour la suppression d'une salle*/}
      <div>
        <Modal open={files.openDelete}>
          <Box>
            <SupprimerSalle nom={salleInfo.nom} />
          </Box>
        </Modal>
      </div>

      {/* Modal pour la suppression d'une salle */}
      <div>
        <Modal open={files.openModify}>
          <Box>
            <ModifierSalle salle={salleInfo} />
          </Box>
        </Modal>
      </div>
    </section>
  );
};

export default Salles;
