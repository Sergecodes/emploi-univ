import React, { useState } from "react";
import { Modal, Box } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Delete } from "@material-ui/icons";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
//import { useNavigate } from "react-router";

export default function AjoutCoursGraphique() {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [current, setCurrent] = useState({ heure: "", jour: "" });
  /* const [valeurDefaut, setValeurDefaut]=useState({
    code: "",
    salle: "",
    enseignant: "",
  })*/
  const [valeurDefaut, setValeurDefaut] = useState({
    code: "",
    salle: "",
    enseignant: "",
  });
  const [cours, setCours] = useState({
    code: "",
    salle: "",
    enseignant: "",
  });
  const [timetable, setTimetable] = useState([
    {
      titre: "7h-10h55",
      lundi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      mardi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      mercredi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      jeudi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      vendredi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      samedi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      dimanche: {
        code: "",
        salle: "",
        enseignant: "",
      },
    },
    {
      titre: "11h-12h55",
      lundi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      mardi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      mercredi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      jeudi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      vendredi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      samedi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      dimanche: {
        code: "",
        salle: "",
        enseignant: "",
      },
    },
    {
      titre: "13h-15h55",
      lundi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      mardi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      mercredi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      jeudi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      vendredi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      samedi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      dimanche: {
        code: "",
        salle: "",
        enseignant: "",
      },
    },
    {
      titre: "16h-18h55",
      lundi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      mardi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      mercredi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      jeudi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      vendredi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      samedi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      dimanche: {
        code: "",
        salle: "",
        enseignant: "",
      },
    },
    {
      titre: "19h-21h55",
      lundi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      mardi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      mercredi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      jeudi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      vendredi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      samedi: {
        code: "",
        salle: "",
        enseignant: "",
      },
      dimanche: {
        code: "",
        salle: "",
        enseignant: "",
      },
    },
  ]);
  function createData(
    titre,
    lundi,
    mardi,
    mercredi,
    jeudi,
    vendredi,
    samedi,
    dimanche
  ) {
    return {
      titre,
      lundi,
      mardi,
      mercredi,
      jeudi,
      vendredi,
      samedi,
      dimanche,
    };
  }
  function insertion() {
    let temp = [];
    for (let i in timetable) {
      temp.push(
        createData(
          timetable[i].titre,
          timetable[i].lundi,
          timetable[i].mardi,
          timetable[i].mercredi,
          timetable[i].jeudi,
          timetable[i].vendredi,
          timetable[i].samedi,
          timetable[i].dimanche
        )
      );
    }
    return temp;
  }

  function handleOpen(heure, jour) {
    const temp = { heure: heure, jour: jour };
    const filteredTable = timetable.filter((elt) => elt.titre === heure);
    setValeurDefaut(filteredTable[0][jour]);
    setCurrent(temp);
    setOpen(true);
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setCours({ ...cours, [name]: value });
  }

  function handleAjout() {
    const newTimetable =  [...timetable];
    for (let i in newTimetable) {
      if (newTimetable[i].titre === current.heure) {
        newTimetable[i][current.jour] = cours;
        setTimetable(newTimetable);
        setOpen(false);
        break;
      }
    }
  }

  function handleDeletion(){
    const newTimetable = [...timetable];
    for (let i in newTimetable) {
      if (newTimetable[i].titre === current.heure) {
        newTimetable[i][current.jour] = {
          code: "",
          salle: "",
          enseignant: "",
        };
        setTimetable(newTimetable);
        setOpen(false);
        break;
      }
    }
  }

  const rows = insertion();
  return (
    <section className="my-3 mx-2  listeTableau">
      <h4 className="text-center mx-2 my-3 fw-bold fs-5">
        AJOUTER UN OU PLUSIEURS COURS
      </h4>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="dataHeader"> </TableCell>
                <TableCell className="dataHeader">Lundi </TableCell>
                <TableCell className="dataHeader">Mardi </TableCell>
                <TableCell className="dataHeader">Mercredi </TableCell>
                <TableCell className="dataHeader">Jeudi</TableCell>
                <TableCell className="dataHeader">Vendredi</TableCell>
                <TableCell className="dataHeader">Samedi</TableCell>
                <TableCell className="dataHeader">Dimanche</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.titre}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="horaires">
                    {row.titre}
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      <p>{row.lundi.code}</p>
                      <p>{row.lundi.salle}</p>
                      <p>{row.lundi.enseignant}</p>
                    </div>
                    {
                      <div >
                        <BsPencilFill
                          className="ajouterUe"
                          style={{color:"green"}}
                          onClick={() => handleOpen(row.titre, "lundi")}
                        />
                        <BsTrashFill
                          className="supprimerUe"
                          style={{color:"red"}}
                          onClick={() => handleDeletion(row.titre)}
                        />
                      </div>
                    }
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      <p>{row.mardi.code}</p>
                      <p>{row.mardi.salle}</p>
                      <p>{row.mardi.enseignant}</p>
                    </div>
                    {
                      <div >
                        <BsPencilFill
                          className="ajouterUe"
                          style={{color:"green"}}
                          onClick={() => handleOpen(row.titre, "mardi")}
                        />
                        <BsTrashFill
                          className="supprimerUe"
                          style={{color:"red"}}
                          onClick={() => handleDeletion(row.titre)}
                        />
                      </div>
                    }
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      <p>{row.mercredi.code}</p>
                      <p>{row.mercredi.salle}</p>
                      <p>{row.mercredi.enseignant}</p>
                    </div>
                    {
                      <div >
                        <BsPencilFill
                          className="ajouterUe"
                          style={{color:"green"}}
                          onClick={() => handleOpen(row.titre, "mercredi")}
                        />
                        <BsTrashFill
                          className="supprimerUe"
                          style={{color:"red"}}
                          onClick={() => handleDeletion(row.titre)}
                        />
                      </div>
                    }
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      <p>{row.jeudi.code}</p>
                      <p>{row.jeudi.salle}</p>
                      <p>{row.jeudi.enseignant}</p>
                    </div>
                    {
                      <div >
                        <BsPencilFill
                          className="ajouterUe"
                          style={{color:"green"}}
                          onClick={() => handleOpen(row.titre, "jeudi")}
                        />
                        <BsTrashFill
                          className="supprimerUe"
                          style={{color:"red"}}
                          onClick={() => handleDeletion(row.titre)}
                        />
                      </div>
                    }
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      <p>{row.vendredi.code}</p>
                      <p>{row.vendredi.salle}</p>
                      <p>{row.vendredi.enseignant}</p>
                    </div>
                    {
                      <div >
                        <BsPencilFill
                          className="ajouterUe"
                          style={{color:"green"}}
                          onClick={() => handleOpen(row.titre, "vendredi")}
                        />
                        <BsTrashFill
                          className="supprimerUe"
                          style={{color:"red"}}
                          onClick={() => handleDeletion(row.titre)}
                        />
                      </div>
                    }
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      <p>{row.samedi.code}</p>
                      <p>{row.samedi.salle}</p>
                      <p>{row.samedi.enseignant}</p>
                    </div>
                    {
                      <div >
                        <BsPencilFill
                          className="ajouterUe"
                          style={{color:"green"}}
                          onClick={() => handleOpen(row.titre, "samedi")}
                        />
                        <BsTrashFill
                          className="supprimerUe"
                          style={{color:"red"}}
                          onClick={() => handleDeletion(row.titre)}
                        />
                      </div>
                    }
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      <p>{row.dimanche.code}</p>
                      <p>{row.dimanche.salle}</p>
                      <p>{row.dimanche.enseignant}</p>
                    </div>
                    {
                      <div >
                        <BsPencilFill
                          className="ajouterUe"
                          style={{color:"green"}}
                          onClick={() => handleOpen(row.titre, "dimanche")}
                        />
                        <BsTrashFill
                          className="supprimerUe"
                          style={{color:"red"}}
                          onClick={() => handleDeletion(row.titre)}
                        />
                      </div>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/*Modal pour la modification d'une salle*/}
      <div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box>
            <div
              className="d-flex justify-content-center row"
              style={{ width: "100%" }}
            >
              <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-7">
                <h4 className="fs-5 fw-light text-center">
                  Vous ètes sur le point d'ajouter un nouveau cours à votre
                  emploi de temps
                </h4>
                <div className="mt-4">
                  <div className="my-3">
                    <label htmlFor="code">Code_Ue :</label>
                    <input
                      type="text"
                      name="code"
                      onChange={handleChange}
                      defaultValue={valeurDefaut.code}
                    ></input>
                  </div>
                  <div className="my-3">
                    <label htmlFor="salle">Nom de la salle :</label>
                    <input
                      type="text"
                      name="salle"
                      onChange={handleChange}
                      defaultValue={valeurDefaut.salle}
                    ></input>
                  </div>
                  <div className="my-3">
                    <label htmlFor="enseignant">Nom enseignant</label>
                    <input
                      type="text"
                      name="enseignant"
                      onChange={handleChange}
                      defaultValue={valeurDefaut.enseignant}
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
                    onClick={handleAjout}
                  >
                    Ajouter
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
