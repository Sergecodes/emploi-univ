import React, { useState, useEffect } from "react";
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
import Alert from '@mui/material/Alert';
import axios from "axios";
import Cookies from "js-cookie";

export default function ListeSalles() {
  const [open, setOpen] = useState(false);
  const [alert ,setAlert]=useState("none")
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [actual,setActual]=useState({})
  const [updateSalle, setUpdateSalle] = useState({ nom: "nom", capacite: "capacite" });
  const [listeSalles, setListeSalles] = useState([{}]);
  const rows = insertion();
  const csrftoken = Cookies.get('csrftoken');

  const headers={
    'X-CSRFToken': csrftoken
  }

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


  useEffect(() => {
    axios
      .get("http://localhost:8000/api/Salle/all/")
      .then((res) => setListeSalles(res.data))
      .catch((err) => console.log(err));
  }, []);

  function createData(nom, capacite, modif, suppression) {
    return { nom, capacite, modif, suppression };
  }
  function insertion() {
    let temp = [];
    for (let i in listeSalles) {
      temp.push(
        createData(
          listeSalles[i].nom,
          listeSalles[i].capacite,
          "Modifier",
          "Supprimer"
        )
      );
    }
    return temp;
  }

  function handleOpen(nom) {
    let temp = [...listeSalles];
    temp = temp.filter((elt) => elt.nom === nom);
    setUpdateSalle(temp[0]);
    setActual(temp[0])
    setOpen(true);
    setAlert("none")
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateSalle({ ...updateSalle, [name]: value });
  };

  const handleUpdate=()=>{
    if(actual.nom===updateSalle.nom && actual.capacite===updateSalle.capacite){
      setAlert("warning")
    }
    else{
      axios({
        method:'put',
        url:`http://localhost:8000/api/salles/${encodeURIComponent(actual.nom)}/`,
        data:{new_nom:updateSalle.nom, new_capacite:updateSalle.capacite},
        headers:headers,
        withCredentials:true
      })
      .then(res=>console.log(res))
      .catch(err=>console.error(err))
    }
  }

  const handleDelete=()=>{
    axios({
      method:'delete',
      url:`http://localhost:8000/api/salles/${encodeURIComponent(actual.nom)}/`,
      headers:headers,
      withCredentials:true
    })
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
  }

  return (
    <section className="my-3 mx-2  listeTableau">
      <h4 className="text-center mx-2 my-3 fw-bold fs-5">
        LISTE DES DIFFERENTES SALLES DE COURS DE LA FACULTE DES SCIENCES DE
        L'UNVERSITE DE YAOUNDE 1
      </h4>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom de la salle</TableCell>
                <TableCell>Capacité</TableCell>
                <TableCell align="right">Modifier la salle</TableCell>
                <TableCell align="right">Supprimer la salle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.nom}
                    </TableCell>
                    <TableCell>{row.capacite}</TableCell>
                    <TableCell align="right">
                      <button
                        type="button"
                        className="btn modifyButton "
                        style={{
                          backgroundColor: "var(--secondaryBlue)",
                          color: "white",
                        }}
                        onClick={() => handleOpen(row.nom)}
                      >
                        <BsPenFill className="me-1" /> {row.modif}
                      </button>
                    </TableCell>
                    <TableCell align="right">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => setOpenConfirmation(true)}
                      >
                        <Delete /> {row.suppression}
                      </button>
                    </TableCell>
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
                  Modification des informations concernant une salle
                 <div className="my-2">
                   {/* <Alert severity="error">This is an error alert — check it out!</Alert>
<Alert severity="warning">This is a warning alert — check it out!</Alert>
<Alert severity="info">This is an info alert — check it out!</Alert>
<Alert severity="success">This is a success alert — check it out!</Alert> */}
                  <Alert severity="warning" style={alert!=="warning"?{display:"none"}:{}}>Veuillez effectuez un changement avant de cliquer sur modifier</Alert>
                 </div>
                </h4>
                <div className="mt-4">
                  <div className="my-3">
                    <label htmlFor="nom">Nom de la salle :</label>
                    <input
                      type="text"
                      name="nom"
                      style={{ minWidth: "70%" }}
                      value={updateSalle.nom}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="my-3">
                    <label htmlFor="capacite">Capacité :</label>
                    <input
                      type="number"
                      value={updateSalle.capacite}
                      onChange={handleChange}
                      name="capacite"
                      min="1"
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
                  <button
                    className="btn addButton"
                    type="button"
                    onClick={handleUpdate}
                  >
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
                  <button className="btn btn-danger " type="button" onClick={handleDelete}>
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
