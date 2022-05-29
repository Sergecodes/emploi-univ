import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderFooter from "./Screen/HeaderFooter";
import Accueil from "./Screen/Accueil";
import Admin from "./Screen/Admin";
import ComputerScience from "./Components/Consultation/ComputerScience";
import AjoutEnseignant from "./Components/Admin/AjoutEnseignant";
import AjoutSalle from "./Components/Admin/AjoutSalle";
import AjoutFiliere from "./Components/Admin/AjoutFiliere";
import AjoutUe from "./Components/Admin/AjoutUe";
import AjoutCoursFormulaire from "./Components/Admin/AjoutCoursFormulaire";
import AjoutCoursGraphique from "./Components/Admin/AjoutCoursGraphique";
import ListeSalles from "./Components/Admin/ListeSalles";
import ListeEnseignants from "./Components/Admin/ListeEnseignants";
import ListeFilieres from "./Components/Admin/ListeFilieres";

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
            <Route path="/admin/ajout-enseignant" element={<AjoutEnseignant/>}/>
            <Route path="/admin/ajout-filiere" element={<AjoutFiliere/>}/>
            <Route path="/admin/ajout-salle" element={<AjoutSalle/>}/>
            <Route path="/admin/ajout-ue" element={<AjoutUe/>}/>
            <Route path="/admin/ajout-cours-formulaire" element={<AjoutCoursFormulaire/>}/>
            <Route path="/admin/ajout-cours-graphique" element={<AjoutCoursGraphique/>}/>
            <Route path="/admin/liste-salles" element={<ListeSalles/>}/>
            <Route path="/admin/liste-enseignants" element={<ListeEnseignants/>}/>
            <Route path="/admin/liste-filieres" element={<ListeFilieres/>}/>
            <Route path="/admin/liste-ue" element={<ListeUe/>}/>

          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
