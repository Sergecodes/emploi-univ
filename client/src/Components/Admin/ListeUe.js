import React, { useState } from "react";
import { Modal, Box } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TablePagination } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Delete } from "@material-ui/icons";
import { BsPenFill } from "react-icons/bs";
import { filiere } from "../../Constant";

export default function ListeUe() {
  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  //pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //fin pagination
  const ue = [
    {
      code_ue: "code 1",
      intitule: "intitule 1",
      enseignant: "enseignant 1",
      filiere: "COMPUTER SCIENCE",
      niveau: "license 1",
      specialite: "aucune",
    },
    {
      code_ue: "code 2",
      intitule: "intitule 2",
      enseignant: "enseignant 2",
      filiere: "MATHEMATIQUE ",
      niveau: "license 2",
      specialite: "aucune",
    },
    {
      code_ue: "code 3",
      intitule: "intitule 3",
      enseignant: "enseignant 3",
      filiere: "COMPUTER SCIENCE",
      niveau: "license 3",
      specialite: "Genie logiciel",
    },
  ];
  function createData(
    code_ue,
    intitule,
    enseignant,
    filiere,
    niveau,
    specialite,
    modif,
    suppression
  ) {
    return {
      code_ue,
      intitule,
      enseignant,
      filiere,
      niveau,
      modif,
      specialite,
      suppression,
    };
  }
  function insertion() {
    let temp = [];
    for (let i in ue) {
      temp.push(
        createData(
          ue[i].code_ue,
          ue[i].intitule,
          ue[i].enseignant,
          ue[i].filiere,
          ue[i].niveau,
          ue[i].specialite,
          <button
            type="button"
            className="btn modifyButton "
            style={{
              backgroundColor: "var(--secondaryBlue)",
              color: "white",
            }}
            onClick={() => setOpen(true)}
          >
            <BsPenFill className="me-1" /> Modifier
          </button>,
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setOpenConfirmation(true)}
          >
            <Delete /> Supprimer
          </button>
        )
      );
    }
    return temp;
  }
  const rows = insertion();
  return (
    <section className="my-3 mx-2  listeTableau">
      <h4 className="text-center mx-2 my-3 fw-bold fs-5">
        LISTE DES DIFFERENTES UNITES D'ENSEIGNEMENT AU SEIN DE LA FACULTE DES
        SCIENCES DE L'UNVERSITE DE YAOUNDE 1
      </h4>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Code_Ue </TableCell>
                <TableCell>Intitule </TableCell>
                <TableCell>Enseignant </TableCell>
                <TableCell>Filiere </TableCell>
                <TableCell>Niveau</TableCell>
                <TableCell>Specialite</TableCell>
                <TableCell>Modifier l'enseignant</TableCell>
                <TableCell>Supprimer l'enseignant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.code_ue}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.code_ue}
                    </TableCell>
                    <TableCell>{row.intitule}</TableCell>
                    <TableCell>{row.enseignant}</TableCell>
                    <TableCell>{row.filiere}</TableCell>
                    <TableCell>{row.niveau}</TableCell>
                    <TableCell>{row.specialite}</TableCell>
                    <TableCell>{row.modif}</TableCell>
                    <TableCell>{row.suppression}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/*Modal pour la modification d'une salle*/}
      <div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box>
            <div
              className="d-flex justify-content-center row"
              style={{ width: "100%" }}
            >
              <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-6">
                <h4 className="fs-5 fw-light text-center">
                  Modification des informations concernant une UE
                </h4>
                <div className="mt-4">
                  <div className="my-3">
                    <label htmlFor="nom">Code_Ue :</label>
                    <input
                      type="text"
                      name="nom"
                      style={{ minWidth: "70%" }}
                    ></input>
                  </div>
                  <div className="my-3">
                    <label htmlFor="prenom">Intitulé :</label>
                    <input
                      type="text"
                      name="prenom"
                      style={{ minWidth: "70%" }}
                    ></input>
                  </div>
                  <div className="my-3">
                    <label htmlFor="nom">Nom enseignant :</label>
                    <input
                      type="text"
                      name="nom"
                      style={{ minWidth: "60%" }}
                    ></input>
                  </div>
                  <div className="my-3">
                    <label for="filiere">Filiere :</label>
                    <select name="filiere">
                      {filiere.map((elt) => {
                        return (
                          <option key={elt.id} name={elt.nom}>
                            {elt.nom}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="my-3">
                    <label for="niveau">Niveau :</label>
                    <select name="niveau">
                      <option name="master">License 1</option>
                      <option name="doctorat">License 2</option>
                      <option name="doctorat">License 3</option>
                      <option name="master">master</option>
                      <option name="doctorat">doctorat</option>
                    </select>
                  </div>
                  <div className="my-3">
                    <label for="specialite">Specialite :</label>
                    <select name="specialite">
                      <option name="data-science">Data Science</option>
                      <option name="genie-logiciel">doctorat</option>
                    </select>
                  </div>
                </div>
                <div
                  className="my-3 d-flex justify-content-end "
                  style={{ width: "100%" }}
                >
                  <button
                    className="btn me-2 cancelButton"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Annuler{" "}
                  </button>
                  <button className="btn addButton" type="button">
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>

      {/*Modal pour la suppression d'une salle*/}
      <div>
        <Modal
          open={openConfirmation}
          onClose={() => setOpenConfirmation(false)}
        >
          <Box>
            <div
              className="d-flex justify-content-center  row"
              style={{ width: "100%" }}
            >
              <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-6">
                <h4 className="fs-5 fw-light text-center">
                  Voulez vous vraiment Supprimer cette UE?
                </h4>
                <div
                  className="my-4 d-flex justify-content-center "
                  style={{ width: "100%" }}
                >
                  <button
                    className="btn me-2 cancelButton"
                    type="button"
                    onClick={() => setOpenConfirmation(false)}
                  >
                    Annuler{" "}
                  </button>
                  <button className="btn btn-danger " type="button">
                    <Delete /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </section>
  );
}
