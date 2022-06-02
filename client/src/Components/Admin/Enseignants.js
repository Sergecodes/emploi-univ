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
} from "../../redux/ModalDisplaySlice";
import axios from "axios";

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

  const files = useSelector((state) => state.ModalDisplay);
  

  
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/enseignants/")
      .then((res) => setListeEnseignants(res.data))
      .catch((err) => console.log(err));
  }, [files.openAjout]);


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
