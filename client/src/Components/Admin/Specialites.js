import React, {useState, useEffect} from "react";
import tableIcons from "../Common/MaterialTableIcons";
import MaterialTable from "material-table";
import { Modal, Box } from "@material-ui/core";
import AjouterSpecialite from "./Specialites/AjouterSpecialite";
import SupprimerSpecialite from "./Specialites/SupprimerSpecialite";
import ModifierSpecialite from "./Specialites/ModifierSpecialite";
import { useSelector, useDispatch } from "react-redux";
import {
  handleOpenAjout,
  handleOpenDelete,
  handleOpenModify,
} from "../../redux/ModalDisplaySlice";
import axios from "axios";

const Salles = () => {
  const [listeSpecialites, setListeSpecialites] = useState([{}
  ]);
 const [specialiteInfo, setSpecialiteInfo] = useState({ });

  const data = listeSpecialites;
  const columns = [
    { title: "Filiere", field: "nom_filiere", align: "center" },
    { title: "Specialite", field: "nom_specialite", align: "center" },
    { title: "Niveau", field: "nom_niveau", align: "center" },
  
  ];

  const dispatch = useDispatch();

  const handleModify = (data) => {
    setSpecialiteInfo(data);
    dispatch(handleOpenModify());
  };

  const handleDelete = (data) => {
    setSpecialiteInfo(data);
    dispatch(handleOpenDelete());
  };

  const files = useSelector((state) => state.ModalDisplay);
  
  
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/specialites/")
      .then((res) =>{setListeSpecialites(res.data);console.log(res.data)})
      .catch((err) => console.log(err));
  }, []);

  /*const handlePost=()=>{
    axios({
        method:'post',
        url:"http://localhost:8000/api/specialites/",
        data:{nom_filiere:"Chimie",specialites:[{nom:"Chimie compliquée",master:true, licence:true,effectif:250},{nom:"Chimie facile",master:true, licence:true,effectif:250}]},
        headers:headers,
        withCredentials:true
      })
      .then(res=>console.log(res))
      .catch(err=>console.error(err))
  }
*/
//filiere ,  niveau , specialite
  return (
    <section className="materialTableSalle mx-2 my-3">
       <MaterialTable
        title="SPECIALITES DE L'UNIVERSITE"
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: "Modifier une specialite",
            onClick: (event, data) => handleModify(data),
          },
          {
            icon: tableIcons.Delete,
            tooltip: "Supprimer une specialite",
            onClick: (event, data) => handleDelete(data),
          },
          {
            icon: tableIcons.Add,
            tooltip: "Ajouter une/plusieurs specialite(s)",
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
            <AjouterSpecialite />
          </Box>
        </Modal>
      </div>

      {/*Modal pour la suppression d'une specialite*/}
      <div>
        <Modal open={files.openDelete}>
          <Box>
            <SupprimerSpecialite specialite={specialiteInfo}/>
          </Box>
        </Modal>
      </div>

      {/* Modal pour la suppression d'une specialite  */}
      <div>
        <Modal open={files.openModify}>
          <Box>
            <ModifierSpecialite specialite={specialiteInfo.nom_specialite}  />
          </Box>
        </Modal>
      </div>
    </section>
  );
};

export default Salles;
