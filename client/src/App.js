import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderFooter from "./Screen/HeaderFooter";
import Accueil from "./Screen/Accueil";
import Admin from "./Screen/Admin";
import ComputerScience from "./Components/Consultation/ComputerScience";
import AjoutUe from "./Components/Admin/AjoutUe";
import AjoutCoursFormulaire from "./Components/Admin/AjoutCoursFormulaire";
import AjoutCoursGraphique from "./Components/Admin/AjoutCoursGraphique";
import Salles from "./Components/Admin/Salles";
import Enseignants from "./Components/Admin/Enseignants";
import Filieres from "./Components/Admin/Filieres";
import Specialites from "./Components/Admin/Specialites";

import ListeUe from "./Components/Admin/ListeUe";



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate replace to="/accueil" />} />
          <Route path="/admin" element={<Navigate replace to="/admin/dashboard" />} />
          <Route path="/" element={<HeaderFooter />}>
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/computer-science" element={<ComputerScience />} />
            
          </Route>
          <Route path="/admin" element={<Admin/>}>
            <Route path="/admin/dashboard" element={<p className="my-5">Un paragraphe</p>}/>
            <Route path="/admin/ajout-enseignant" element={<p>Ajout enseignant</p>}/>
            <Route path="/admin/ajout-filiere" element={<p>Ajout filiere</p>}/>
            <Route path="/admin/ajout-salle" element={<p>Ajout salle</p>}/>
            <Route path="/admin/ajout-ue" element={<AjoutUe/>}/>
            <Route path="/admin/ajout-cours-formulaire" element={<AjoutCoursFormulaire/>}/>
            <Route path="/admin/ajout-cours-graphique" element={<AjoutCoursGraphique/>}/>
            <Route path="/admin/liste-salles" element={<Salles/>}/>
            <Route path="/admin/liste-enseignants" element={<Enseignants/>}/>
            <Route path="/admin/liste-filieres" element={<Filieres/>}/>
            <Route path="/admin/liste-ue" element={<ListeUe/>}/>
            <Route path="/admin/liste-specialites" element={<Specialites/>}/>


          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
