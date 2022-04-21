
import React from "react"
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import Accueil from "./components/accueil";
import Cours from "./components/cours";
import Login from "./components/Login";
import Register from "./components/Register";
import AfficherCours from "./components/affichercours.js";

export default function App() {
  
  return (
    <React.Fragment>
      <Header />
      <main>
      <Routes>
          <Route path='/' element={<Accueil />} />
          <Route path='/cours' element={<Cours />} />
          <Route path='/inscription' element={<Register />} />
          <Route path='/connexion' element={<Login />} />
          <Route path='/:slug' element={<AfficherCours />} />
      </Routes>
      </main>
      <footer>
        <p>Nicolas | Damirdine | Christopher</p>
      </footer>
    </React.Fragment>
  );
}