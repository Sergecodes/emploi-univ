import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderFooter from "./Screen/HeaderFooter";
import Accueil from "./Screen/Accueil";
import Admin from "./Screen/Admin";
import ComputerScience from "./Components/Consultation/ComputerScience";
import Salles from "./Components/Admin/Salles";
import Enseignants from "./Components/Admin/Enseignants";
import Filieres from "./Components/Admin/Filieres";
import Specialites from "./Components/Admin/Specialites";
import Groupes from "./Components/Admin/Groupes";
import Niveaux from "./Components/Admin/Niveaux"
import AjoutCoursGraphique from "./Components/Admin/AjoutCoursGraphique";


import UniteEnseignement from "./Components/Admin/UniteEnseignement";



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
            <Route path="/admin/dashboard" element={<p>Dashboard</p>}/>
            <Route path="/admin/ajout-cours-graphique" element={<AjoutCoursGraphique/>}/>
            <Route path="/admin/liste-salles" element={<Salles/>}/>
            <Route path="/admin/liste-enseignants" element={<Enseignants/>}/>
            <Route path="/admin/liste-filieres" element={<Filieres/>}/>
            <Route path="/admin/liste-ue" element={<UniteEnseignement/>}/>
            <Route path="/admin/liste-specialites" element={<Specialites/>}/>
            <Route path="/admin/liste-groupes" element={<Groupes/>}/>
            <Route path="/admin/liste-niveaux" element={<Niveaux/>}/>



          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
