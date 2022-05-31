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

export default function ListeEnseignants() {
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
  const enseignants = [
    { nom: "Nom 1", prenom: "Prenom 1", matricule: "mat 1" },
    { nom: "Nom 2", prenom: "Prenom 2", matricule: "mat 2" },
    { nom: "Nom 3", prenom: "Prenom 3", matricule: "mat 3" },
  ];
  function createData(nom, prenom, matricule, modif, suppression) {
    return { nom, prenom, matricule, modif, suppression };
  }
  function insertion() {
    let temp = [];
    for (let i in enseignants) {
      temp.push(
        createData(
          enseignants[i].nom,
          enseignants[i].prenom,
          enseignants[i].matricule,
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
        LISTE DES DIFFERENTS ENSEIGNANTS DISPENSANT LES COURS AU SEIN DE LA
        FACULTE DES SCIENCES DE L'UNVERSITE DE YAOUNDE 1
      </h4>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom </TableCell>
                <TableCell>Prenom</TableCell>
                <TableCell align="left">Matricule</TableCell>
                <TableCell align="left">Modifier l'enseignant</TableCell>
                <TableCell align="left">Supprimer l'enseignant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                <TableRow
                  key={row.nom}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nom}
                  </TableCell>
                  <TableCell>{row.prenom}</TableCell>
                  <TableCell align="left">{row.matricule}</TableCell>
                  <TableCell align="left">{row.modif}</TableCell>
                  <TableCell align="left">{row.suppression}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2,5,10]}
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
                  Modification des informations concernant un enseignant
                </h4>
                <div className="mt-4">
                  <div className="my-3">
                    <label htmlFor="nom">Nom :</label>
                    <input
                      type="text"
                      name="nom"
                      style={{ minWidth: "70%" }}
                    ></input>
                  </div>
                  <div className="my-3">
                    <label htmlFor="prenom">Prenom :</label>
                    <input
                      type="text"
                      name="prenom"
                      style={{ minWidth: "70%" }}
                    ></input>
                  </div>
                  <div className="my-3">
                    <label htmlFor="matricule">Matricule :</label>
                    <input
                      type="text"
                      name="matricule"
                      style={{ minWidth: "80px" }}
                    ></input>
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
                  Voulez vous vraiment Supprimer cet enseignant?
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
