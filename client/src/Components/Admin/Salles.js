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
} from "../../redux/ModalDisplaySlice";
import axios from "axios";

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
  }, [files.openAjout]);


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
