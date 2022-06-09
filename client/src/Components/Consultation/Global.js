import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";


const Global = React.forwardRef((props, ref) => {
  const [activate, setActivate] = useState(true);
  const [choix, setChoix] = useState({
    nom: props.nom,
    nom_niveau: "",
    nom_specialite: "",
    jour: "",
    heure: "",
    ue: "",
  });

  const [listeNiveaux, setListeNiveaux] = useState([]);
  const [listeSpecialites, setListeSpecialites] = useState([]);


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

  useEffect(() => {
    const axiosLinks = [
      "http://localhost:8000/api/filieres/",
      "http://localhost:8000/api/niveaux/",
      "http://localhost:8000/api/cours/",
    ];
    Promise.all(axiosLinks.map((link) => axios.get(link)))
      .then(
        axios.spread((...allData) => {
          setListeNiveaux(allData[1].data);
          setChoix((prevState) => ({
            ...prevState,
            nom_niveau: allData[1].data[0].nom_bref,
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
  }, [choix.nom, choix.nom_niveau]);
  const handleSelectChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setChoix({ ...choix, [name]: value });
  };

  return (
    <section ref={ref} className="my-3 mx-2  affichageTableau">
        <h4 className="text-center fs-2 fw-bold my-2" style={{color:"var(--primaryBlue"}}> BIOSCIENCE</h4>
      <div className="d-flex justify-content-around  align-items-center">
        <div className="my-4 d-flex justify-content-center ">
          <label htmlFor="nom_niveau " className="fw-bold me-2">
            Selectionnez en niveau :
          </label>
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
            className="fw-bold me-2"
          >
            SPECIALITE :
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
              {timetable.map((row) => (
                <TableRow
                  key={row.titre}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className="horairesAffichage"
                  >
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
     
    </section>
  );
});

export default Global;
