import React, { useState ,useEffect} from "react";
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
import Cookies from "js-cookie";
import axios from "axios";

export default function ListeEnseignants() {
  
  const [listeEnseignants,setListeEnseignants]=useState([{}])
  const [open, setOpen] = useState(false);
  const [alert ,setAlert]=useState("none")
  const [openConfirmation, setOpenConfirmation] = useState(false);
   const [actual,setActual]=useState({})
  const [updateEnseignant, setUpdateEnseignant] = useState({ });
  
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

  useEffect(()=>{
    axios
    .get("http://localhost:8000/api/Enseignant/all/")
    .then((res) => setListeEnseignants(res.data))
    .catch((err) => console.log(err));
  },[])

  function createData(nom, prenom, matricule, modif, suppression) {
    return { nom, prenom, matricule, modif, suppression };
  }
  function insertion() {
    let temp = [];
    for (let i in listeEnseignants) {
      temp.push(
        createData(
          listeEnseignants[i].nom,
          listeEnseignants[i].prenom,
          listeEnseignants[i].matricule,
          "Modifier",
          "Supprimer"
        )
      );
    }
    return temp;
  }

  function handleOpen(matricule) {
    let temp = [...listeEnseignants];
    temp = temp.filter((elt) => elt.matricule === matricule);
    setUpdateEnseignant(temp[0]);
    setActual(temp[0])
    setOpen(true);
    setAlert("none")

  }

  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateEnseignant({ ...updateEnseignant, [name]: value });
  };

  const handleUpdate=()=>{
    if(actual.nom===updateEnseignant.nom && actual.prenom===updateEnseignant.prenom &&actual.matricule===updateEnseignant.matricule){
      setAlert("warning")
    }
    else{
      axios({
        method:'put',
        url:`http://localhost:8000/api/enseignants/${actual.matricule}/`,
        data:updateEnseignant,
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
      url:`http://localhost:8000/api/enseignants/${actual.matricule}/`,
      headers:headers,
      withCredentials:true
    })
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
  }

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
                .map((row,index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nom}
                  </TableCell>
                  <TableCell>{row.prenom}</TableCell>
                  <TableCell align="left">{row.matricule}</TableCell>
                  <TableCell align="left">
                      <button
                        type="button"
                        className="btn modifyButton "
                        style={{
                          backgroundColor: "var(--secondaryBlue)",
                          color: "white",
                        }}
                        onClick={() => handleOpen(row.matricule)}
                      >
                        <BsPenFill className="me-1" /> {row.modif}
                      </button>
                    </TableCell>
                    <TableCell align="left">
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
                <div className="my-2">
                  <Alert severity="warning" style={alert!=="warning"?{display:"none"}:{}}>Veuillez effectuez un changement avant de cliquer sur modifier</Alert>
                 </div>
                <div className="mt-4">
                  <div className="my-3">
                    <label htmlFor="nom">Nom :</label>
                    <input
                      type="text"
                      name="nom"
                      style={{ minWidth: "70%" }}
                      value={updateEnseignant.nom}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="my-3">
                    <label htmlFor="prenom">Prenom :</label>
                    <input
                      type="text"
                      name="prenom"
                      style={{ minWidth: "70%" }}
                      value={updateEnseignant.prenom}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="my-3">
                    <label htmlFor="matricule">Matricule :</label>
                    <input
                      type="text"
                      name="matricule"
                      style={{ minWidth: "80px" }}
                      value={updateEnseignant.matricule}
                      onChange={handleChange}
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
                  <button className="btn addButton" type="button" onClick={handleUpdate}>
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
