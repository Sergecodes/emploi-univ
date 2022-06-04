import React, {useState, useEffect} from "react";
import tableIcons from "../Common/MaterialTableIcons";
import MaterialTable from "material-table";
import { Modal, Box } from "@material-ui/core";
import AjouterGroupe from "./Groupes/AjouterGroupe";
import SupprimerGroupe from "./Groupes/SupprimerGroupe";
import ModifierGroupe from "./Groupes/ModifierGroupe";
import { useSelector, useDispatch } from "react-redux";
import {
  handleOpenAjout,
  handleOpenDelete,
  handleOpenModify,
} from "../../redux/ModalDisplaySlice";
//import axios from "axios";

const Groupes = () => {
  const [listeGroupes, setListeGroupes] = useState([{nom_groupe:"groupe 1", nom_niveau:"niveau 1", nom_filiere:"CHimie"},{nom_groupe:"groupe 2", nom_niveau:"niveau 1", nom_filiere:"CHimie"},{nom_groupe:"groupe 1", nom_niveau:"niveau 2", nom_filiere:"Physique"}
  ]);
 const [groupeInfo, setGroupeInfo] = useState({ });

  const data = listeGroupes;
  const columns = [
    { title: "Filiere", field: "nom_filiere", align: "center" },
    { title: "Niveau", field: "nom_niveau", align: "center" },
    { title: "Groupe", field: "nom_groupe", align: "center" },
  
  ];

  const dispatch = useDispatch();

  const handleModify = (data) => {
    setGroupeInfo(data);
    dispatch(handleOpenModify());
  };

  const handleDelete = (data) => {
    setGroupeInfo(data);
    dispatch(handleOpenDelete());
  };

  const files = useSelector((state) => state.ModalDisplay);
  
  
 /* useEffect(() => {
    axios
      .get("http://localhost:8000/api/groupes/")
      .then((res) =>{setListeGroupes(res.data);console.log(res.data)})
      .catch((err) => console.log(err));
  }, []);*/

  /*const handlePost=()=>{
    axios({
        method:'post',
        url:"http://localhost:8000/api/groupes/",
        data:{nom_filiere:"Chimie",specialites:[{nom:"Chimie compliquée",master:true, licence:true,effectif:250},{nom:"Chimie facile",master:true, licence:true,effectif:250}]},
        headers:headers,
        withCredentials:true
      })
      .then(res=>console.log(res))
      .catch(err=>console.error(err))
  }
*/
//filiere ,  niveau , groupe
  return (
    <section className="materialTableSalle mx-2 my-3">
       <MaterialTable
        title="GROUPES DE L'UNIVERSITE"
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: "Modifier une groupe",
            onClick: (event, data) => handleModify(data),
          },
          {
            icon: tableIcons.Delete,
            tooltip: "Supprimer une groupe",
            onClick: (event, data) => handleDelete(data),
          },
          {
            icon: tableIcons.Add,
            tooltip: "Ajouter une/plusieurs groupe(s)",
            isFreeAction: true,
            onClick: () => dispatch(handleOpenAjout()),

          },
        ]}
        icons={tableIcons}
        columns={columns}
        data={data}
        options={{ paging: false, grouping: true }}
      /> 

      {/*Modal pour l'ajout d'une specialite*/}
      <div>
        <Modal open={files.openAjout}>
          <Box>
            <AjouterGroupe />
          </Box>
        </Modal>
      </div>

      {/*Modal pour la suppression d'une Groupe*/}
      <div>
        <Modal open={files.openDelete}>
          <Box>
            <SupprimerGroupe groupeInfo={groupeInfo} />
          </Box>
        </Modal>
      </div>

      {/* Modal pour la suppression d'une groupe  */}
      <div>
        <Modal open={files.openModify}>
          <Box>
            <ModifierGroupe groupeInfo={groupeInfo}  />
          </Box>
        </Modal>
      </div>
    </section>
  );
};

export default Groupes;
