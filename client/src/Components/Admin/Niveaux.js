import React, { useState,useEffect} from "react";
import tableIcons from "../Common/MaterialTableIcons";
import MaterialTable from "material-table";
import axios from "axios";

const Niveaux = () => {
  const [listeNiveaux, setListeNiveaux] = useState([{}]);
  const data = listeNiveaux;
  const columns = [
    { title: "Nom Bref", field: "nom_bref", align: "center" },
    { title: "Nom complet", field: "nom_complet", align: "center" },
  ];
  


  useEffect(()=>{
        axios.get('http://localhost:8000/api/niveaux/')
        .then(res=>{setListeNiveaux(res.data);console.log(res.data)})
        .catch(err=>console.error(err))
  },[])


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
