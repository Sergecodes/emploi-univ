import React, { useState,useEffect} from "react";
import tableIcons from "../Common/MaterialTableIcons";
import MaterialTable from "material-table";
//import { useSelector, useDispatch } from "react-redux";
//import axios from "axios";

const Niveaux = () => {
    const niveaux=[{nom_bref:"L1",nom:"Niveau 1"},{nom_bref:"L2",nom:"Niveau 2"},{nom_bref:"L3",nom:"Niveau 3"}]
  const [listeNiveaux, setListeNiveaux] = useState(niveaux);
  const data = listeNiveaux;
  const columns = [
    { title: "Nom Bref", field: "nom_bref", align: "center" },
    { title: "Nom complet", field: "nom", align: "center" },
  ];
  


 /* useEffect(()=>{
        axios.get('http://localhost:8000/api/niveaux/')
        .then(res=>setListeNiveaux(res.data))
        .catch(err=>console.error(err))
  },[])*/


  return (
    <section className="materialTableSalle mx-2 my-3">
      <MaterialTable
        title="DIFFERENTES NIVEAUX DE L'UNIVERSITE"
        
        icons={tableIcons}
        columns={columns}
        data={data}
        options={{ paging: false}}
      />

     
    </section>
  );
};

export default Niveaux;
