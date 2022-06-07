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
import axios from "axios";

const Groupes = () => {
  const [listeGroupes, setListeGroupes] = useState([{}]);
 const [groupeInfo, setGroupeInfo] = useState({ });

  const data = listeGroupes;
  const columns = [
    { title: "Groupe", field: "groupe.nom", align: "center" },
    { title: "Filiere", field: "filiere.nom", align: "center" },
    { title: "Niveau", field: "niveau.nom_bref", align: "center" },
    { title: "Specialité", field: "specialite.nom", align: "center" },

  
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
  
  
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/groupes/")
      .then((res) =>{setListeGroupes(res.data); console.log(res.data)})
      .catch((err) => console.log(err));
  }, []);

  
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

      {/*Modal pour la suppression d'une Group e*/}
      <div>
        <Modal open={files.openDelete}>
          <Box>
            <SupprimerGroupe groupeInfo={{nom_filiere:groupeInfo.filiere,groupe:groupeInfo.groupe, nom_specialite:groupeInfo.specialite, nom_niveau:groupeInfo.niveau}}  />
          </Box>
        </Modal>
      </div>

      {/* Modal pour la suppression d'une groupe  */}
      <div>
        <Modal open={files.openModify}>
          <Box>
            <ModifierGroupe groupeInfo={{nom_filiere:groupeInfo.filiere,new_nom:groupeInfo.groupe, nom_specialite:groupeInfo.specialite, nom_niveau:groupeInfo.niveau}}  />
          </Box>
        </Modal>
      </div>
    </section>
  );
};

export default Groupes;
