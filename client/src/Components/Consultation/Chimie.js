import React from "react";
import ListeNiveauxFilieres from "./ListeNiveauxFilieres";


const Chimie=()=>{

  return(
    <div className="my-3">
      <h4 className="text-center fs-2 fw-bold my-2" style={{color:"var(--primaryBlue"}}> CHIMIE</h4>
      <ListeNiveauxFilieres nom={'Chimie'}/>
    </div>
  )
}

export default Chimie
