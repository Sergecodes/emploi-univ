import React, { useState,useEffect} from "react";
import tableIcons from "../Common/MaterialTableIcons";
import MaterialTable from "material-table";
import { Modal, Box } from "@material-ui/core";
import AjoutCours from "./Cours/AjoutCours";
import SupprimerCours from "./Cours/SupprimerCours";
import ModifierCours from "./Cours/ModifierCours";
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

const Salles = () => {
  const [listeCours, setListeCours] = useState([{}
  ]);
  const [coursInfo, setCoursInfo] = useState([]);
 const [listeEnseignants, setListeEnseignants] =useState([]);

  const data = listeCours;
  const columns = [
    { title: "Ue", field: "ue.code", align: "center" },
    { title: "Journée", field: "jour", align: "center" },
    { title: "Debut", field: "heure_debut", align: "center" },
    { title: "Fin", field: "heure_fin", align: "center" },
    { title: "Salle", field: "salle.nom", align: "center" },
 //   { title: "enseignant", field: "ue.code", align: "center" },
    { title: "TD?", field: "is_td", align: "center" },
    { title: "Virtuel?", field: "is_virtuel", align: "center" },
    { title: "Decription", field: "description", align: "center" },
    
  
  ];


  const dispatch = useDispatch();

  const handleModify = (data) => {
    let new_coursInfo = { nom: data.nom, capacite: data.capacite };
    setCoursInfo(new_coursInfo);
    dispatch(handleOpenModify());
  };

  const handleDelete = (data) => {
    setCoursInfo(data.ue.code);
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
      .get("http://localhost:8000/api/cours/")
      .then((res) => {setListeCours(res.data);setListeEnseignants(res.data.enseignant);console.log(res.data[0],'quelquechose')})
      .catch((err) => console.log(err));
  }, [files.openAjout,files.openModify,files.openDelete]);


  return (
    <section className="materialTableSalle mx-2 my-3">
      <MaterialTable
        title="DIFFERENTS COURS DE L'UNIVERSITE"
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: "Modifier une cours",
            onClick: (event, data) => handleModify(data),
          },
          {
            icon: tableIcons.Delete,
            tooltip: "Supprimer une cours",
            onClick: (event, data) => handleDelete(data),
          },
          {
            icon: tableIcons.Add,
            tooltip: "Ajouter une cours",
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

      {/*Modal pour l'ajout d'une cours*/}
      <div>
        <Modal open={files.openAjout} type={"formulaire"} style={{overflow:"scroll"}}>
          <Box>
            <AjoutCours />
          </Box>
        </Modal>
      </div>

      {/*Modal pour la suppression d'une cours*/}
      <div>
        <Modal open={files.openDelete}>
          <Box>
            <SupprimerCours cours={coursInfo} />
          </Box>
        </Modal>
      </div>

      {/* Modal pour la suppression d'une cours */}
      <div>
        <Modal open={files.openModify}>
          <Box>
            <ModifierCours cours={coursInfo} />
          </Box>
        </Modal>
      </div>
    </section>
  );
};

export default Salles;






/*
 detailPanel={[
          {
            tooltip: 'Show Name',
            render: (rowData) => {
              
              return (
                <div>steph</div>
              )
            },
          }]}*/


























/*import React,{useEffect} from 'react';
import axios from "axios";
import Cookies from "js-cookie";

const Cours = () => {
    const csrftoken = Cookies.get('csrftoken');

    const headers={
      'X-CSRFToken': csrftoken
    }
    useEffect(()=>{
        axios.get('http://localhost:8000/api/cours')
        .then(res=>console.log(res.data))
        .catch(err=>console.error(err))
    },[])


    const handlePost=()=>{
        axios({
            method:'post',
            url:"http://localhost:8000/api/cours/",
            data:{code_ue:'inf 487',nom_salle:'S006',enseignants:['19M4444'], 
            jour:'LUN', heure_debut:'7h00', heure_fin:'9h55'},
            headers:headers,
            withCredentials:true
          })
          .then(res=>console.log(res))
          .catch(err=>console.error(err))
    }
    const handleUe=()=>{
      const name='inf 487'
      axios({
        method:'post',
        url:`http://localhost:8000/api/cours/${encodeURIComponent(name)}/`,
        data:{new_code_ue:'inf 487',new_nom_salle:'S008',enseignants:['19M4444'], 
        new_jour:'MAR', new_heure_debut:'7h00', new_heure_fin:'9h45', new_is_td:false},
        headers:headers,
        withCredentials:true
      })
      .then(res=>console.log(res))
      .catch(err=>console.error(err))
  }

const handleDelete=()=>{
  const name='inf 487'
  axios({
    method:'delete',
    url:`http://localhost:8000/api/cours/${encodeURIComponent(name)}/`,
    headers:headers,
    withCredentials:true
  })
  .then(res=>console.log(res))
  .catch(err=>console.error(err))
}

  return (
   <section>
        <div>Cours</div>
    <button type="button" className="btn btn-primary" onClick={handlePost}>post</button>
    <button type="button" className="btn btn-primary" onClick={handleUe}>ue</button>
    <button type="button" className="btn btn-primary" onClick={handleDelete}>delete</button>


   </section>
  )
}

export default Cours*/


