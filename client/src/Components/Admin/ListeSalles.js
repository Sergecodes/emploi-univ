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

export default function ListeSalles() {
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
  const salles = [{nom:"AMPHI 502",capacite:500},{nom:"AMPHI 350",capacite:350},{nom:"AMPHI 250",capacite:250}, {nom:"AMPHI 1001",capacite:1001}, {nom:"S006",capacite:70}];
  function createData(nom,capacite, modif, suppression) {
    return { nom,capacite, modif,suppression };
  }
  function insertion() {
    let temp = [];
    for (let i in salles) {
      temp.push(
        createData(
          salles[i].nom,
          salles[i].capacite,
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
      )
    }
    return temp;
 
  }
  const rows = insertion();
  return (
    <section className="my-3 mx-2  listeTableau">
      <h4 className="text-center mx-2 my-3 fw-bold fs-5">
        LISTE DES DIFFERENTES SALLES DE COURS DE LA FACULTE DES SCIENCES DE
        L'UNVERSITE DE YAOUNDE 1
      </h4>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom de la salle</TableCell>
              <TableCell >Capacité</TableCell>
              <TableCell align="right">Modifier la salle</TableCell>
              <TableCell align="right">Supprimer la salle</TableCell>
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
                <TableCell >{row.capacite}</TableCell>
                <TableCell align="right">{row.modif}</TableCell>
                <TableCell align="right">{row.suppression}</TableCell>
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
                  Modification des informations concernant une salle
                </h4>
                <div className="mt-4">
                  <div className="my-3">
                    <label htmlFor="nom">Nom de la salle :</label>
                    <input
                      type="text"
                      name="nom"
                      style={{ minWidth: "70%" }}
                    ></input>
                  </div>
                  <div className="my-3">
                    <label htmlFor="capacite">Capacité :</label>
                    <input type="number" name="capacite" min="1"></input>
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
                  Voulez vous vraiment Supprimer la salle?
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
