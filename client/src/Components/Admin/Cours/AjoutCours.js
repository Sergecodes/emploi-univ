import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { handleOpenAjout } from "../../../redux/ModalDisplaySlice";
import { horairesDebut, horairesFin, Jour } from "../../../Constant";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';
import {BsTrash, BsPlus} from "react-icons/bs";

const AjoutCours = (props) => {
  const [choixEnseignants, setChoixEnseignants] = useState([]);
  const [listeFilieres, setListeFilieres] = useState([]);
 // const [enseignants, setEnseignants] = useState([]);
  const [listeNiveaux, setListeNiveaux] = useState([]);
  const [listeSpecialites, setListeSpecialites] = useState([]);
  const [activate, setActivate] = useState(true);
  const [options, setOptions] = useState({
    intitule: false,
    isTd: false,
    isVirtuel: false,
    groupe:false,
    description:"",
    code:"",
    salle:"",
    groupeData:""
  })
  const [changeHour, setChangeHour] = useState(false);
  const [choix, setChoix] = useState({
    nom: "",
    nom_niveau: "",
    nom_specialite: "",
    jour: "",
    heureDebut: "",
    heureFin: "",
  });
  const csrftoken = Cookies.get("csrftoken");
  const dispatch = useDispatch();



  useEffect(() => {
    const axiosLinks = [
      "http://localhost:8000/api/filieres/",
      "http://localhost:8000/api/niveaux/",
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
    }
  }, [choix.nom, choix.nom_niveau]);

  const handleClick = () => {
    setChoixEnseignants([
      ...choixEnseignants,
      { id: choixEnseignants.length, matricule_enseignant: "" },
    ]);
  };

  const handleInputChange = (e, id) => {
    const new_choixEnseignants = [...choixEnseignants];
    new_choixEnseignants[id].matricule_enseignant = e.target.value;
    setChoixEnseignants(new_choixEnseignants);
  };

  const handleDelete = (e, id) => {
    const new_choixEnseignants = choixEnseignants.filter(
      (elt) => elt.id !== id
    );
    setChoixEnseignants(new_choixEnseignants);
  };

  const handleSelectChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setChoix({ ...choix, [name]: value });
  };

  const headers = {
    "X-CSRFToken": csrftoken,
  };
  const handleAjout = () => {
    /*let new_cours = [];
    for (let i in cours) {
      new_cours.push(cours[i].nom_cours);
    }
    console.log(new_cours);
    console.log(choix);
    axios({
      method: "post",
      url: "http://localhost:8000/api/cours/",
      data: {
        nom_filiere: choix.nom,
        nom_niveau: choix.nom_niveau,
        nom_specialite: activate ? null : choix.nom_specialite,
        groupes: new_groupe,
      },
      headers: headers,
      withCredentials: true,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));*/
      console.log(choix, options,activate)
  };
  const CoursParams=()=>{
    if(props.type==='graphique'){
      return(
        <div className="d-flex justify-content-around align-items-center" >
          <p>Filiere:<span className="fw-bold">{props.element.nom}</span></p>
          <p>Niveau:<span className="fw-bold">{props.element.nom_niveau}</span></p>
          <p style={props.activate?{display:"none"}:{}}>Specialite:<span className="fw-bold">{props.element.nom_specialite}</span></p>
          <p>Jour:<span className="fw-bold">{props.element.jour}</span></p>
          <p>Heure:<span className="fw-bold">{props.element.heure}</span></p>
        </div>
      )
    }
    else{
      return(
        <div className="important" >
          <div className="mt-4  d-flex align-items-center justify-content-around" >
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
         <div className="d-flex justify-content-around align-items-center">
            
          <div className="my-4 d-flex justify-content-center ">
            <label htmlFor="jour">Jour :</label>
            <select name="jour" onChange={(e) => handleSelectChange(e)}>
              {Jour.map((elt, index) => {
                return (
                  <option key={elt.id} name={elt.jour}>
                    {elt.jour}
                  </option>
                );
              })}
            </select>
          </div>
            <div className="my-4 d-flex">
              <label htmlFor="heureDebut" className="mx-2">
                Heure debut :
              </label>
              <select
                name="heureDebut"
                onChange={(e) => handleSelectChange(e)}
                style={changeHour ? { display: "none" } : {}}
              >
                {horairesDebut.map((elt) => {
                  return (
                    <option key={elt.id} name={elt.heureDebut}>
                      {elt.heureDebut}
                    </option>
                  );
                })}
              </select>
              <input
                type="time"
                onChange={(e) => handleSelectChange(e)}
                name="heureDebut"
                style={!changeHour ? { display: "none" } : {}}
              />
            </div>
            <div className="my-4 d-flex  ">
              <label htmlFor="heureFin" className="mx-2">
                Heure fin :
              </label>
              <select
                name="heureFin"
                onChange={(e) => handleSelectChange(e)}
                style={changeHour ? { display: "none" } : {}}
              >
                {horairesFin.map((elt) => {
                  return (
                    <option key={elt.id} name={elt.heureFin} >
                      {elt.heureFin}
                    </option>
                  );
                })}
              </select>
              <input
                type="time"
                onChange={(e) => handleSelectChange(e)}
                name="heureFin"
                style={!changeHour ? { display: "none" } : {}}
              />
            </div>
            <p
              onClick={() => setChangeHour(true)}
              className="changeHeure"
              style={changeHour ? { display: "none" } : { color: "green" }}
            >
              Definir son horaire
            </p>
            <p
              onClick={() => setChangeHour(false)}
              className="changeHeure"
              style={!changeHour ? { display: "none" } : { color: "red" }}
            >
              Retour
            </p>
         </div>
        </div>
      )
    }
  }
  return (
    <section
      className="d-flex justify-content-center row"
      style={{ width: "100%" }}
    >
      <div className="ajout mt-5  px-3 py-2 col-12 col-md-9 col-lg-8">
        <h4 className="fs-5 fw-light text-center">
          Vous ètes sur le point d'ajouter des informations relatives à un
          nouveau cours dans votre emploi de temps
        </h4>
        <CoursParams/>
        <div className="d-flex flex-column justify-content-center my-3 align-items-center ">
          <div className="my-3 d-flex align-items-center">
            <label htmlFor="code">Code :</label>
            <Stack
              spacing={2}
              sx={{ minWidth: "280px", padding: "0px", margin: "0px" }}
            >
              <Autocomplete
                id="controllable-states-demo"
                options={listeFilieres.map((option) => option.nom)}
               
                onChange={(event, newValue) => {
                  setOptions({ ...options, code:newValue })
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="code"                               
                    size="small"
                  />
                )}
              />
            </Stack>
          </div>
          <div className="d-flex align-items-center justify-content-around">
            <div>
              <label htmlFor="intitule">Intitule</label>
              <input type="text" value="intutule" disabled={true}></input>
            </div>
            <input
              type="checkbox"
              className="ms-3"
              name="intitule"
              value={options.intitule}
              onChange={(e) =>
                setOptions({ ...options, [e.target.name]: !options.intitule })
              }
            />
          </div>
          <div className="my-3 d-flex align-items-center">
            <label htmlFor="salle">Salle :</label>
            <Stack
              spacing={2}
              sx={{ minWidth: "280px", padding: "0px", margin: "0px" }}
            >
              <Autocomplete
                id="controllable-states-demo"
                options={listeFilieres.map((option) => option.nom)}
                onChange={(event, newValue) => {
                  setOptions({ ...options, salle:newValue })
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="salle"                                     
                    size="small"                   
                  />
                )}
              />
            </Stack>
          </div>
          <div className="d-flex justify-content-center my-3 align-items-center ">
            <div className="fw-bold">Ajouter un enseignant </div>
            <button
              type="button"
              className="btn buttonSpecialityAdd mx-4"
              onClick={handleClick}
            >
              <BsPlus />
            </button>
          </div>
          <div>
            {choixEnseignants.map((elt) => {
              return (
                <div
                  className="d-flex justify-content-around  align-items-center mx-1 my-3"
                  key={elt.id}
                >
                  <div className="d-flex">
                    <label htmlFor={elt.id}>Matricule :</label>
                 {/*   <input
                      type="text"
                      id={elt.id}
                      value={choixEnseignants[elt.id].matricule_enseignant}
                      onChange={(e) => handleInputChange(e, elt.id)}
              ></input>*/}
                    <Stack
                      spacing={2}
                      sx={{ minWidth: "280px", padding: "0px", margin: "0px" }}
                    >
                      <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={listeFilieres.map((option) => option.nom)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="matricule"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                            size="small"
                            onClick={(e) => handleInputChange(e, elt.id)}
                            value={choixEnseignants[elt.id].matricule_enseignant}
                          />
                        )}
                      />
                    </Stack>
                  </div>
                  
                  <button
                    type="button"
                    className="btn btn-danger deleteSpeciality"
                    onClick={(e) => handleDelete(e, elt.id)}
                  >
                    <BsTrash />
                  </button>

                </div>
              );
            })}
          </div>
          <div className="my-4 d-flex justify-content-center align-items-center" style={options.groupe?{}:{color:"grayText"}}>
            <label htmlFor="groupeData">Groupes :</label>
            <select name="groupeData"  onChange={(e) =>
                      setOptions({ ...options, [e.target.name]:e.target.value})
                    }>
              {listeNiveaux.map((elt, index) => {
                return (
                  <option key={index} name={elt.nom_bref} disabled={options.groupe?false:true} >
                    {elt.nom_bref}
                  </option>
                );
              })}
            </select>
            <input
              type="checkbox"
              className="ms-3"
              name='groupe'
              value={options.groupe}
              onChange={(e) =>
                setOptions({ ...options, [e.target.name]: !options.groupe })
              }
            />
          </div>
          <div  className="my-4 d-flex justify-content-center ">
              <div className="mx-3">
                <label htmlFor="isTd">TD? :  </label>
                <input
                  type="checkbox"
                  name='isTd'
                  value={options.isTd}
                  onChange={(e) =>
                    setOptions({ ...options, [e.target.name]: !options.isTd })
                  }
                />
              </div>
              <div>
              <label htmlFor="nom_groupe">Virtuel? :</label>
                <input
                  type="checkbox"
                  className="isVirtuel"
                  name='isVirtuel'
                  value={options.isVirtuel}
                  onChange={(e) =>
                    setOptions({ ...options, [e.target.name]: !options.isVirtuel})
                  }
                />
              </div>
          </div>
            <div className="my-3 d-flex justify-content-center"  style={options.isVirtuel?{}:{color:"grayText"}}>
              <label htmlFor="description">Description :</label>
              <input
                type="text"
                name="description"
                onChange={(e) =>
                  setOptions({ ...options, [e.target.name]: e.target.value })
                }
                disabled={options.isVirtuel?false:true}
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
            onClick={() => dispatch(handleOpenAjout())}
          >
            Annuler{" "}
          </button>
          <button className="btn addButton" type="button" onClick={handleAjout}>
            Ajouter
          </button>
        </div>
      </div>
    </section>
  );
};

export default AjoutCours;
