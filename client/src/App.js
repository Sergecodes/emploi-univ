import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import HeaderFooter from "./Screen/HeaderFooter";
import Accueil from "./Screen/Accueil";
import ComputerScience from "./Components/Consultation/ComputerScience";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConnexionAdminScreen from "./Screen/ConnexionAdminScreen";
import Emplois from "./Screen/Emplois";
const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<HeaderFooter />}>
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/computer-science" element={<ComputerScience />} />
          </Route>
          <Route path="/connexion" element={<ConnexionAdminScreen />} />
          <Route path="/emplois" element={<Emplois />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
