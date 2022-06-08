import React,{useState, useEffect} from 'react';
import axios from "axios";


const ListeNiveauxFilieres = (props) => {
const [listeNiveaux, setListeNiveaux] = useState([]);
const [listeSpecialites, setListeSpecialites] = useState([]);
const [activate, setActivate] = useState(true);
const [choix, setChoix] = useState({
    nom: props.nom,
    nom_niveau: "",
    nom_specialite: "",
  });

  useEffect(() => {
    const axiosLinks = [
      "http://localhost:8000/api/filieres/",
      "http://localhost:8000/api/niveaux/",
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
    }
  }, [choix.nom, choix.nom_niveau]);

  const handleSelectChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setChoix({ ...choix, [name]: value });
  };

  return (
    <section className="d-flex justify-content-around  align-items-center"> 
        <div className="my-4 d-flex justify-content-center ">
            <label htmlFor="nom_niveau " className="fw-light fs-5 me-2">Selectionnez en niveau :</label>
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
              style={activate === true ? { color: "GrayText" ,fontStyle:'italic'} : {}}
              className="fw-light fs-5 me-2"
            >
              Selectionnez une spécialité :
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
          <button type="button" className="my-4 btn  boutonFill">Generer</button>
    </section>
  )
}

export default ListeNiveauxFilieres