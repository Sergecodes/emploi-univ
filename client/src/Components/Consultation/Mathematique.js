import React from "react";
import ListeNiveauxFilieres from "./ListeNiveauxFilieres";


const Mathematique=()=>{

  return(
    <div className="my-3">
      <h4 className="text-center fs-2 fw-bold my-2" style={{color:"var(--primaryBlue"}}> MATHEMATIQUE</h4>
      <ListeNiveauxFilieres nom={'Mathematique'}/>
    </div>
  )
}

export default Mathematique
