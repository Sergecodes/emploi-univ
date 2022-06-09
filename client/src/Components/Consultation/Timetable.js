import React, { useState, useEffect  } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { fakeData } from "../../Constant";
import { useSelector } from "react-redux";
import axios from "axios"



const Timetable=React.forwardRef((props, ref)=> {
 const files = useSelector((state) => state.ModalDisplay);

  function verification(fakeData,jour,heure){
    let retour=[];
    for(let i in fakeData){
      if(fakeData[i].jour===jour && fakeData[i].heure_debut[0]===heure[0]&&fakeData[i].heure_debut[1]===heure[1]){
          retour.push({
            code: fakeData[i].ue.code,
            salle:fakeData[i].salle.nom,
            enseignants:fakeData[i].enseignants,
            description:fakeData[i].description,
            groupe: fakeData[i].groupe===null?"":fakeData[i].groupe
          })
      }
    }
    if(retour.length===0){
      retour.push( { 
        code: "",
        salle:"",
        groupe:"",
        enseignants:[{nom:"",prenom:""}],
        description:"",
      })
    }
    return retour;
  }
  const [timetable, setTimetable] = useState([
    {
      titre: "7h-09h55",
      lundi: verification(fakeData,'LUN',"07h-09h55"),
      mardi: verification(fakeData,'MAR',"07h-09h55"),
      mercredi: verification(fakeData,'MER',"07h-09h55"),
      jeudi: verification(fakeData,'JEU',"07h-09h55"),
      vendredi: verification(fakeData,'VEN',"07h-09h55"),
      samedi: verification(fakeData,'SAM',"07h-09h55"),
      dimanche:verification(fakeData,'DIM',"07h-09h55"),
    },
    {
      titre: "10h-12h55",
      lundi: verification(fakeData,'LUN',"10h-12h55"),
      mardi: verification(fakeData,'MAR',"10h-12h55"),
      mercredi: verification(fakeData,'MER',"10h-12h55"),
      jeudi: verification(fakeData,'JEU',"10h-12h55"),
      vendredi: verification(fakeData,'VEN',"10h-12h55"),
      samedi: verification(fakeData,'SAM',"10h-12h55"),
      dimanche:verification(fakeData,'DIM',"10h-12h55"),
    },
    {
      titre: "13h-15h55",
      lundi: verification(fakeData,'LUN',"13h-15h55"),
      mardi: verification(fakeData,'MAR',"13h-15h55"),
      mercredi: verification(fakeData,'MER',"13h-15h55"),
      jeudi: verification(fakeData,'JEU',"13h-15h55"),
      vendredi: verification(fakeData,'VEN',"13h-15h55"),
      samedi: verification(fakeData,'SAM',"13h-15h55"),
      dimanche:verification(fakeData,'DIM',"13h-15h55"),
    },
    {
      titre: "16h-18h55",
      lundi: verification(fakeData,'LUN',"16h-18h55"),
      mardi: verification(fakeData,'MAR',"16h-18h55"),
      mercredi: verification(fakeData,'MER',"16h-18h55"),
      jeudi: verification(fakeData,'JEU',"16h-18h55"),
      vendredi: verification(fakeData,'VEN',"16h-18h55"),
      samedi: verification(fakeData,'SAM',"16h-18h55"),
      dimanche:verification(fakeData,'DIM',"16h-18h55"),
    },
    {
      titre: "19h-21h55",
      lundi: verification(fakeData,'LUN',"19h-21h55"),
      mardi: verification(fakeData,'MAR',"19h-21h55"),
      mercredi: verification(fakeData,'MER',"19h-21h55"),
      jeudi: verification(fakeData,'JEU',"19h-21h55"),
      vendredi: verification(fakeData,'VEN',"19h-21h55"),
      samedi: verification(fakeData,'SAM',"19h-21h55"),
      dimanche:verification(fakeData,'DIM',"19h-21h55"),
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

  useEffect(()=>{
    axios
    .get(`http://localhost:8000/api/cours/${files.filiere.nom}/${files.niveau.nom_niveau}`)
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
  },[files.filiere.nom, files.niveau.nom_niveau, files.specialite.nom_specialite])

  
  const rows = insertion();
  return (
    <section ref={ref} className="my-3 mx-2  affichageTableau">
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
                  <TableCell component="th" scope="row" className="horairesAffichage">
                    {row.titre}
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      {row.lundi.map((elt, index) => {
                        return (
                          <div key={index} style={index < row.lundi.length-1?{borderBottom:"1px solid gray"}:{}}>
                            <p>{elt.code}  </p>
                            <p>{elt.groupe}</p>
                            <p>{elt.salle}</p>
                            <p>{elt.enseignants.map((element, index)=>{
                              return(
                                <span key={index}>
                                    {element.nom}
                                </span>
                              )
                            })}</p>
                          </div>
                        );
                      })}
                    </div>
                   
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      {row.mardi.map((elt, index) => {
                        return (
                          <div key={index} style={index < row.mardi.length-1?{borderBottom:"1px solid gray"}:{}}>
                            <p>{elt.code}  </p>
                            <p>{elt.groupe}</p>
                            <p>{elt.salle}</p>
                            <p>{elt.enseignants.map((element, index)=>{
                              return(
                                <span key={index}>
                                    {element.nom}
                                </span>
                              )
                            })}</p>
                          </div>
                        );
                      })}
                    </div>
                   
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      {row.mercredi.map((elt, index) => {
                        return (
                          <div key={index} style={index < row.mercredi.length-1?{borderBottom:"1px solid gray"}:{}}>
                            <p>{elt.code}  </p>
                            <p>{elt.groupe}</p>
                            <p>{elt.salle}</p>
                            <p>{elt.enseignants.map((element, index)=>{
                              return(
                                <span key={index}>
                                    {element.nom}
                                </span>
                              )
                            })}</p>
                          </div>
                        );
                      })}
                    </div>
                   
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      {row.jeudi.map((elt, index) => {
                       return (
                        <div key={index} style={index < row.jeudi.length-1?{borderBottom:"1px solid gray"}:{}}>
                          <p>{elt.code}  </p>
                          <p>{elt.groupe}</p>
                          <p>{elt.salle}</p>
                          <p>{elt.enseignants.map((element, index)=>{
                            return(
                              <span key={index}>
                                  {element.nom}
                              </span>
                            )
                          })}</p>
                        </div>
                      );
                      })}
                    </div>
                   
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      {row.vendredi.map((elt, index) => {
                        return (
                          <div key={index} style={index < row.vendredi.length-1?{borderBottom:"1px solid gray"}:{}}>
                            <p>{elt.code}  </p>
                            <p>{elt.groupe}</p>
                            <p>{elt.salle}</p>
                            <p>{elt.enseignants.map((element, index)=>{
                              return(
                                <span key={index}>
                                    {element.nom}
                                </span>
                              )
                            })}</p>
                          </div>
                        );
                      })}
                    </div>
                   
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      {row.samedi.map((elt, index) => {
                        return (
                          <div key={index} style={index < row.samedi.length-1?{borderBottom:"1px solid gray"}:{}}>
                            <p>{elt.code}  </p>
                            <p>{elt.groupe}</p>
                            <p>{elt.salle}</p>
                            <p>{elt.enseignants.map((element, index)=>{
                              return(
                                <span key={index}>
                                    {element.nom}
                                </span>
                              )
                            })}</p>
                          </div>
                        );
                      })}
                    </div>
                   
                  </TableCell>
                  <TableCell className="dataCell">
                    <div className="affichageEmploi">
                      {row.dimanche.map((elt, index) => {
                        return (
                          <div key={index} style={index < row.dimanche.length-1?{borderBottom:"1px solid gray"}:{}}>
                            <p>{elt.code}  </p>
                            <p>{elt.groupe}</p>
                            <p>{elt.salle}</p>
                            <p>{elt.enseignants.map((element, index)=>{
                              return(
                                <span key={index}>
                                    {element.nom} <br/>
                                </span>
                              )
                            })}</p>
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
})

export default Timetable;