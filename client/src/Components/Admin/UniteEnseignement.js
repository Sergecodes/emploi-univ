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
} from "../../redux/ModalDisplaySlice";
//import axios from "axios";

const UniteEnseignement = () => {
  const [listeUe, setListeUe] = useState([
    {code:"INF 3018",intitule:"algorithmique et structure de données", nom_filiere:"Chimie",nom_niveau:"niveau 3",nom_specialite:" Geni logiciel"},
    {code:"INF 2058",intitule:"biologie medicale", nom_filiere:"Bioscience",nom_niveau:"niveau 2",nom_specialite:" "}
  ]);
  const [ueInfo, setUeInfo] = useState({  });
  const columns = [
    { title: "Code", field: "code", align: "center" },
    { title: "Intitule", field: "intitule", align: "center" },
    { title: "Nom filiere", field: "nom_filiere", align: "center" },
    { title: "Nom_niveau", field: "nom_niveau", align: "center" },
    { title: "Nom_specialite", field: "nom_specialite", align: "center" },

  ];
  const data = listeUe;
  const dispatch = useDispatch();

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

  const files = useSelector((state) => state.ModalDisplay);
  

  
  /*useEffect(() => {
    axios
      .get("http://localhost:8000/api/ue/")
      .then((res) => setListeUe(res.data))
      .catch((err) => console.log(err));
  }, [files.openAjout]);*/


  return (
    <section className="materialTableSalle mx-2 my-3">
      <MaterialTable
        title="UE FACSCIENCES UY1"
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



