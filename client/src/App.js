import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HeaderFooter from './Screen/HeaderFooter';
import Accueil from './Screen/Accueil';
import ComputerScience from './Components/Consultation/ComputerScience';

import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
const App = () => {
 
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
        <Route path="/" element={<Navigate replace to="/accueil" />}/>
          <Route path="/"  element={<HeaderFooter/>}>
            <Route path="/accueil" element={<Accueil/>}/>
            <Route path="/computer-science" element={<ComputerScience/>}/>
          </Route>
         
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App