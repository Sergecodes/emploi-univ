import React from "react";
import ListeNiveauxFilieres from "./ListeNiveauxFilieres";


const Physique=()=>{

  return(
    <div className="my-3">
      <h4 className="text-center fs-2 fw-bold my-2" style={{color:"var(--primaryBlue"}}> PHYSIQUE</h4>
      <ListeNiveauxFilieres nom={'Physique'}/>
    </div>
  )
}

export default Physique
