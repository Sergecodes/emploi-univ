import React from "react";
import Caroussel from "../Components/Accueil/Caroussel";
import Filiere from "../Components/Accueil/Filiere";
import Description from "../Components/Accueil/Description";
import Map from "../Components/Accueil/Map";

const Accueil=()=>{
    return(
        <>
            <Caroussel/>
            <Filiere/>
            <Description/>
            <Map/>
        </>
    )
}

export default Accueil;