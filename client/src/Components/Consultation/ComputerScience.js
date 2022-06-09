import React from "react";
import ListeNiveauxFilieres from "./ListeNiveauxFilieres";


const ComputerScience=()=>{

  return(
    <div className="my-3">
      <h4 className="text-center fs-2 fw-bold my-2" style={{color:"var(--primaryBlue"}}> INFORMATIQUE</h4>
      <ListeNiveauxFilieres nom={'Informatique'}/>
    </div>
  )
}

export default ComputerScience
