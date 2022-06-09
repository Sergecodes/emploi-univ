import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  handleOpenAjout,
  handleOpenDelete,
  handleOpenSnackbar,
} from "../../redux/ModalDisplaySlice";
import CoursGraphique from "./Cours/CoursGraphique";
import SupprimerCours from "./Cours/SupprimerCours";
import { Modal, Box } from "@material-ui/core";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export default function AjoutCoursGraphique() {
  const dispatch = useDispatch();
  const [deleteList, setDeleteList]=useState([]);
  const [listeFilieres, setListeFilieres] = useState([]);
  const [data, setData] = useState([]);
  const [selectOpen, setSelectOpen] = useState(false);
  const [listeNiveaux, setListeNiveaux] = useState([]);
  const [listeSpecialites, setListeSpecialites] = useState([]);
  const [activate, setActivate] = useState(true);
  const [choix, setChoix] = useState({
    nom: "",
    nom_niveau: "",
    nom_specialite: "",
    jour: "",
    heure: "",
    ue: "",
  });
  const files = useSelector((state) => state.ModalDisplay);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = ()=>{
    if(files.openSnackbar===true){
      dispatch(handleOpenSnackbar())
    }
  }


  const alertMessage = ()=>{
    if(files.alert.type==='success'){
      return( 
        <Alert onClose={()=>handleClose()} severity={"success"} sx={{ width: '100%' }}>
     Opération réussie
   </Alert>)
    }
    else{
      return(
        <Alert onClose={()=>handleClose()} severity={"error"} sx={{ width: '100%' }}>
   Une erreur est survenue lors de l'execution de l'opération
   </Alert>
      )
    }
   
  }
  
  function verification(dataList, jour, heure) {
    let retour = [];
    for (let i in dataList) {
      if (
        dataList[i].jour === jour &&
        dataList[i].heure_debut[0] === heure[0] &&
        dataList[i].heure_debut[1] === heure[1]
      ) {
        retour.push({
          code: dataList[i].ue.code,
          salle: dataList[i].salle.nom,
          enseignants: dataList[i].enseignants,
          description: dataList[i].description,
          groupe: dataList[i].groupe === null ? "" : dataList[i].groupe,
        });
      }
    }

    if (retour.length === 0) {
      retour.push({
        code: "",
        salle: "",
        groupe: "",
        enseignants: [{ nom: "", prenom: "" }],
        description: "",
      });
    }
    return retour;
  }

  const [timetable, setTimetable] = useState([
    {
      titre: "07h-09h55",
      lundi: verification([], "LUN", "07h-09h55"),
      mardi: verification([], "MAR", "07h-09h55"),
      mercredi: verification([], "MER", "07h-09h55"),
      jeudi: verification([], "JEU", "07h-09h55"),
      vendredi: verification([], "VEN", "07h-09h55"),
      samedi: verification([], "SAM", "07h-09h55"),
      dimanche: verification([], "DIM", "07h-09h55"),
    },
    {
      titre: "10h-12h55",
      lundi: verification([], "LUN", "10h-12h55"),
      mardi: verification([], "MAR", "10h-12h55"),
      mercredi: verification([], "MER", "10h-12h55"),
      jeudi: verification([], "JEU", "10h-12h55"),
      vendredi: verification([], "VEN", "10h-12h55"),
      samedi: verification([], "SAM", "10h-12h55"),
      dimanche: verification([], "DIM", "10h-12h55"),
    },
    {
      titre: "13h-15h55",
      lundi: verification([], "LUN", "13h-15h55"),
      mardi: verification([], "MAR", "13h-15h55"),
      mercredi: verification([], "MER", "13h-15h55"),
      jeudi: verification([], "JEU", "13h-15h55"),
      vendredi: verification([], "VEN", "13h-15h55"),
      samedi: verification([], "SAM", "13h-15h55"),
      dimanche: verification([], "DIM", "13h-15h55"),
    },
    {
      titre: "16h-18h55",
      lundi: verification([], "LUN", "16h-18h55"),
      mardi: verification([], "MAR", "16h-18h55"),
      mercredi: verification([], "MER", "16h-18h55"),
      jeudi: verification([], "JEU", "16h-18h55"),
      vendredi: verification([], "VEN", "16h-18h55"),
      samedi: verification([], "SAM", "16h-18h55"),
      dimanche: verification([], "DIM", "16h-18h55"),
    },
    {
      titre: "19h-21h55",
      lundi: verification([], "LUN", "19h-21h55"),
      mardi: verification([], "MAR", "19h-21h55"),
      mercredi: verification([], "MER", "19h-21h55"),
      jeudi: verification([], "JEU", "19h-21h55"),
      vendredi: verification([], "VEN", "19h-21h55"),
      samedi: verification([], "SAM", "19h-21h55"),
      dimanche: verification([], "DIM", "19h-21h55"),
    },
  ]);
  const handleDelete = (heure, jour) => {
    const data = verification(deleteList, jour, heure);
    setData(data);
    if (data.length > 1) {
      setSelectOpen(true);
    } else if (data[0].code !== "") {
      setChoix({ ...choix, ue: data[0].code });
      dispatch(handleOpenDelete());
    }
  };

  useEffect(() => {
    const axiosLinks = [
      "http://localhost:8000/api/filieres/",
      "http://localhost:8000/api/niveaux/",
      "http://localhost:8000/api/cours/",

    ];
    Promise.all(axiosLinks.map((link) => axios.get(link)))
      .then(
        axios.spread((...allData) => {
          setListeFilieres(allData[0].data);
          setListeNiveaux(allData[1].data);
          setChoix((prevState) => ({
            ...prevState,
            nom_niveau: allData[1].data[0].nom_bref,
            nom: allData[0].data[0].nom,
          }));
        })
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (choix.nom !== "" && choix.nom_niveau !== "") {
      axios
        .get(
          `http://localhost:8000/api/specialites/${choix.nom}/${choix.nom_niveau}`
        )
        .then((res) => {
          setListeSpecialites(res.data);
          if (res.data.length !== 0) {
            setChoix((prevState) => ({
              ...prevState,
              nom_specialite: res.data[0].nom_specialite,
            }));
          }
        })
        .catch((err) => console.log(err));
      axios
        .get(`http://localhost:8000/api/cours/${choix.nom}/${choix.nom_niveau}`)
        .then((res) => {
          setDeleteList(res.data);
            setTimetable([
              {
                titre: "07h-09h55",
                lundi: verification(res.data, "LUN", "07h-09h55"),
                mardi: verification(res.data, "MAR", "07h-09h55"),
                mercredi: verification(res.data, "MER", "07h-09h55"),
                jeudi: verification(res.data, "JEU", "07h-09h55"),
                vendredi: verification(res.data, "VEN", "07h-09h55"),
                samedi: verification(res.data, "SAM", "07h-09h55"),
                dimanche: verification(res.data, "DIM", "07h-09h55"),
              },
              {
                titre: "10h-12h55",
                lundi: verification(res.data, "LUN", "10h-12h55"),
                mardi: verification(res.data, "MAR", "10h-12h55"),
                mercredi: verification(res.data, "MER", "10h-12h55"),
                jeudi: verification(res.data, "JEU", "10h-12h55"),
                vendredi: verification(res.data, "VEN", "10h-12h55"),
                samedi: verification(res.data, "SAM", "10h-12h55"),
                dimanche: verification(res.data, "DIM", "10h-12h55"),
              },
              {
                titre: "13h-15h55",
                lundi: verification(res.data, "LUN", "13h-15h55"),
                mardi: verification(res.data, "MAR", "13h-15h55"),
                mercredi: verification(res.data, "MER", "13h-15h55"),
                jeudi: verification(res.data, "JEU", "13h-15h55"),
                vendredi: verification(res.data, "VEN", "13h-15h55"),
                samedi: verification(res.data, "SAM", "13h-15h55"),
                dimanche: verification(res.data, "DIM", "13h-15h55"),
              },
              {
                titre: "16h-18h55",
                lundi: verification(res.data, "LUN", "16h-18h55"),
                mardi: verification(res.data, "MAR", "16h-18h55"),
                mercredi: verification(res.data, "MER", "16h-18h55"),
                jeudi: verification(res.data, "JEU", "16h-18h55"),
                vendredi: verification(res.data, "VEN", "16h-18h55"),
                samedi: verification(res.data, "SAM", "16h-18h55"),
                dimanche: verification(res.data, "DIM", "16h-18h55"),
              },
              {
                titre: "19h-21h55",
                lundi: verification(res.data, "LUN", "19h-21h55"),
                mardi: verification(res.data, "MAR", "19h-21h55"),
                mercredi: verification(res.data, "MER", "19h-21h55"),
                jeudi: verification(res.data, "JEU", "19h-21h55"),
                vendredi: verification(res.data, "VEN", "19h-21h55"),
                samedi: verification(res.data, "SAM", "19h-21h55"),
                dimanche: verification(res.data, "DIM", "19h-21h55"),
              },
            ]);
        })
        .catch((err) => console.log(err));
    }
  }, [choix.nom, choix.nom_niveau,files.openAjout,files.openModify,files.openDelete]);
  const handleSelectChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setChoix({ ...choix, [name]: value });
  };

  

  return (
    <section className="my-3 mx-2  listeTableau">
      <h4 className="text-center mx-2 my-3 fw-bold fs-5">
        AJOUTER UN OU PLUSIEURS COURS
      </h4>
      <div className="d-flex justify-content-around align-items-center">
        <div className="my-4 d-flex justify-content-center ">
          <label htmlFor="nom">Filiere :</label>
          <select name="nom" onChange={(e) => handleSelectChange(e)}>
            {listeFilieres.map((elt, index) => {
              return (
                <option key={index} name={elt.nom}>
                  {elt.nom}
                </option>
              );
            })}
          </select>
        </div>
        <div className="my-4 d-flex justify-content-center ">
          <label htmlFor="nom_niveau">Niveau :</label>
          <select name="nom_niveau" onChange={(e) => handleSelectChange(e)}>
            {listeNiveaux.map((elt, index) => {
              return (
                <option key={index} name={elt.nom_bref}>
                  {elt.nom_bref}
                </option>
              );
            })}
          </select>
        </div>

        <div className="my-4 d-flex justify-content-center align-items-center ">
          <label
            htmlFor="nom_specialite"
            style={activate === true ? { color: "GrayText" } : {}}
          >
            Specialite :
          </label>
          <select
            name="nom_specialite"
            onChange={(e) => handleSelectChange(e)}
            disabled={activate}
          >
            {listeSpecialites.map((elt, index) => {
              return (
                <option key={index} name={elt.nom_specialite}>
                  {elt.nom_specialite}
                </option>
              );
            })}
          </select>
          <input
            type="checkbox"
            className="ms-3"
            value={activate}
            onChange={() => setActivate(!activate)}
          />
        </div>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="dataHeader" align="center">
                  {" "}
                </TableCell>
                <TableCell className="dataHeader" align="center">
                  Lundi{" "}
                </TableCell>
                <TableCell className="dataHeader" align="center">
                  Mardi{" "}
                </TableCell>
                <TableCell className="dataHeader" align="center">
                  Mercredi{" "}
                </TableCell>
                <TableCell className="dataHeader" align="center">
                  Jeudi
                </TableCell>
                <TableCell className="dataHeader" align="center">
                  Vendredi
                </TableCell>
                <TableCell className="dataHeader" align="center">
                  Samedi
                </TableCell>
                <TableCell className="dataHeader" align="center">
                  Dimanche
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timetable.map((row) => (
                <TableRow
                  key={row.titre}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="horaires">
                    {row.titre}
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      {row.lundi.map((elt, index) => {
                        return (
                          <div
                            key={index}
                            style={
                              index < row.lundi.length - 1
                                ? { borderBottom: "1px solid gray" }
                                : {}
                            }
                          >
                            <p>{elt.code} </p>
                            <p>{elt.groupe}</p>
                            <p>{elt.salle}</p>
                            <p>
                              {elt.enseignants.map((element, index) => {
                                return <span key={index}>{element.nom}</span>;
                              })}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    {
                      <div>
                        <BsPencilFill
                          className="ajouterUe"
                          style={{ color: "green" }}
                          onClick={() => {
                            dispatch(handleOpenAjout());
                            setChoix({
                              ...choix,
                              jour: "LUN",
                              heure: row.titre,
                            });
                          }}
                        />
                        <BsTrashFill
                          className="supprimerUe"
                          style={{ color: "red" }}
                          onClick={() => {
                            handleDelete(row.titre, "LUN");
                          }}
                        />
                      </div>
                    }
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      {row.mardi.map((elt, index) => {
                        return (
                          <div
                            key={index}
                            style={
                              index < row.mardi.length - 1
                                ? { borderBottom: "1px solid gray" }
                                : {}
                            }
                          >
                            <p>{elt.code} </p>
                            <p>{elt.groupe}</p>
                            <p>{elt.salle}</p>
                            <p>
                              {elt.enseignants.map((element, index) => {
                                return <span key={index}>{element.nom}</span>;
                              })}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    {
                      <div>
                        <BsPencilFill
                          className="ajouterUe"
                          style={{ color: "green" }}
                          onClick={() => {
                            dispatch(handleOpenAjout());
                            setChoix({
                              ...choix,
                              jour: "MAR",
                              heure: row.titre,
                            });
                          }}
                        />
                        <BsTrashFill
                          className="supprimerUe"
                          style={{ color: "red" }}
                          onClick={() => handleDelete(row.titre, "MAR")}
                        />
                      </div>
                    }
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      {row.mercredi.map((elt, index) => {
                        return (
                          <div
                            key={index}
                            style={
                              index < row.mercredi.length - 1
                                ? { borderBottom: "1px solid gray" }
                                : {}
                            }
                          >
                            <p>{elt.code} </p>
                            <p>{elt.groupe}</p>
                            <p>{elt.salle}</p>
                            <p>
                              {elt.enseignants.map((element, index) => {
                                return <span key={index}>{element.nom}</span>;
                              })}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    {
                      <div>
                        <BsPencilFill
                          className="ajouterUe"
                          style={{ color: "green" }}
                          onClick={() => {
                            dispatch(handleOpenAjout());
                            setChoix({
                              ...choix,
                              jour: "MER",
                              heure: row.titre,
                            });
                          }}
                        />
                        <BsTrashFill
                          className="supprimerUe"
                          style={{ color: "red" }}
                          onClick={() => handleDelete(row.titre, "MER")}
                        />
                      </div>
                    }
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      {row.jeudi.map((elt, index) => {
                        return (
                          <div
                            key={index}
                            style={
                              index < row.jeudi.length - 1
                                ? { borderBottom: "1px solid gray" }
                                : {}
                            }
                          >
                            <p>{elt.code} </p>
                            <p>{elt.groupe}</p>
                            <p>{elt.salle}</p>
                            <p>
                              {elt.enseignants.map((element, index) => {
                                return <span key={index}>{element.nom}</span>;
                              })}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    {
                      <div>
                        <BsPencilFill
                          className="ajouterUe"
                          style={{ color: "green" }}
                          onClick={() => {
                            dispatch(handleOpenAjout());
                            setChoix({
                              ...choix,
                              jour: "JEU",
                              heure: row.titre,
                            });
                          }}
                        />
                        <BsTrashFill
                          className="supprimerUe"
                          style={{ color: "red" }}
                          onClick={() => handleDelete(row.titre, "JEU")}
                        />
                      </div>
                    }
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      {row.vendredi.map((elt, index) => {
                        return (
                          <div
                            key={index}
                            style={
                              index < row.vendredi.length - 1
                                ? { borderBottom: "1px solid gray" }
                                : {}
                            }
                          >
                            <p>{elt.code} </p>
                            <p>{elt.groupe}</p>
                            <p>{elt.salle}</p>
                            <p>
                              {elt.enseignants.map((element, index) => {
                                return <span key={index}>{element.nom}</span>;
                              })}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    {
                      <div>
                        <BsPencilFill
                          className="ajouterUe"
                          style={{ color: "green" }}
                          onClick={() => {
                            dispatch(handleOpenAjout());
                            setChoix({
                              ...choix,
                              jour: "VEN",
                              heure: row.titre,
                            });
                          }}
                        />
                        <BsTrashFill
                          className="supprimerUe"
                          style={{ color: "red" }}
                          onClick={() => handleDelete(row.titre, "VEN")}
                        />
                      </div>
                    }
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      {row.samedi.map((elt, index) => {
                        return (
                          <div
                            key={index}
                            style={
                              index < row.samedi.length - 1
                                ? { borderBottom: "1px solid gray" }
                                : {}
                            }
                          >
                            <p>{elt.code} </p>
                            <p>{elt.groupe}</p>
                            <p>{elt.salle}</p>
                            <p>
                              {elt.enseignants.map((element, index) => {
                                return <span key={index}>{element.nom}</span>;
                              })}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    {
                      <div>
                        <BsPencilFill
                          className="ajouterUe"
                          style={{ color: "green" }}
                          onClick={() => {
                            dispatch(handleOpenAjout());
                            setChoix({
                              ...choix,
                              jour: "SAM",
                              heure: row.titre,
                            });
                          }}
                        />
                        <BsTrashFill
                          className="supprimerUe"
                          style={{ color: "red" }}
                          onClick={() => handleDelete(row.titre, "SAM")}
                        />
                      </div>
                    }
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      {row.dimanche.map((elt, index) => {
                        return (
                          <div
                            key={index}
                            style={
                              index < row.dimanche.length - 1
                                ? { borderBottom: "1px solid gray" }
                                : {}
                            }
                          >
                            <p>{elt.code} </p>
                            <p>{elt.groupe}</p>
                            <p>{elt.salle}</p>
                            <p>
                              {elt.enseignants.map((element, index) => {
                                return (
                                  <span key={index}>
                                    {element.nom} <br />
                                  </span>
                                );
                              })}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    {
                      <div>
                        <BsPencilFill
                          className="ajouterUe"
                          style={{ color: "green" }}
                          onClick={() => {
                            dispatch(handleOpenAjout());
                            setChoix({
                              ...choix,
                              jour: "DIM",
                              heure: row.titre,
                            });
                          }}
                        />
                        <BsTrashFill
                          className="supprimerUe"
                          style={{ color: "red" }}
                          onClick={() => handleDelete(row.titre, "DIM")}
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

      {/*snackbar */}
      <div>
      <Snackbar open={files.openSnackbar} autoHideDuration={6000} onClose={()=>handleClose()}>
         {alertMessage()}
      </Snackbar>
      </div>
      {/*Modal pour l'ajout d'un cours*/}
      
      <div>
        <Modal open={files.openAjout} style={{ overflow: "scroll" }}>
          <Box>
            <CoursGraphique
              element={choix}
              activate={activate}
            />
            <button
              className="btn me-2 cancelButton"
              type="button"
              onClick={() => dispatch(handleOpenAjout())}
            >
              Annuler{" "}
            </button>
          </Box>
        </Modal>
      </div>

      {/** Modal pour selectionner une UE */}
      <div>
        <Modal open={selectOpen}>
          <Box>
            <div
              className="ajout mt-5   px-3 py-2 col-12 col-md-9 col-lg-8"
              style={{ marginLeft: "20%" }}
            >
              <h4 className="fs-5 fw-light text-center">Selectionnez l'ue</h4>
              <div className="d-flex justify-content-around">
                {data.map((elt, index) => {
                  return (
                    <button
                      key={index}
                      className="btn addButton"
                      type="button"
                      onClick={() => {
                        setChoix({ ...choix, ue: elt.code});
                        setSelectOpen(false);
                        dispatch(handleOpenDelete());
                      }}
                    >
                      {elt.code}
                    </button>
                  );
                })}
              </div>
              <button
                className="btn my-2   d-flex justify-content-center cancelButton"
                type="button"
                onClick={() => setSelectOpen(false)}
              >
                Annuler{" "}
              </button>
            </div>
          </Box>
        </Modal>
      </div>

      {/*Modal pour supprimer un cours*/}
      <div>
        <Modal open={files.openDelete}>
          <Box>
            <SupprimerCours cours={choix.ue} />
          </Box>
        </Modal>
      </div>
    </section>
  );
}
