import React from 'react';
import axios from "axios"

const ModifierCours = () => {
  const nomfil='Biosciences';
  const nomniv='M1'

   const handlePost=()=>{
    axios
    .get(`http://localhost:8000/api/cours/filieres/${encodeURIComponent(nomfil)}/${encodeURIComponent(nomniv)}//`)
    .then((res) =>{console.log(res.data)})
    .catch((err) => console.log(err));
   }



  return (
    <div>
      <button type="button" onClick={handlePost}>post</button>
    </div>
  )
}

export default ModifierCours