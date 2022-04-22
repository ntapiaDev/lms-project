import React from "react"
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import Accueil from "./components/accueil";
import Cours from "./components/cours";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import AfficherCours from "./components/affichercours";
import RequireAuth from "./components/RequireAuth"

export default function App() {
  
  return (
    <React.Fragment>
      <Header />
      <main>
      <Routes>
          <Route path='/' element={<Accueil />} />
          <Route element={<RequireAuth />}>
            <Route path='/cours' element={<Cours />} />
            <Route path='/:slug' element={<AfficherCours />} />
          </Route>
          <Route path='/inscription' element={<Register />} />
          <Route path='/connexion' element={<Login />} />
          <Route path='/deconnexion' element={<Logout />} />
      </Routes>
      </main>
      <footer>
        <p>Nicolas | Damirdine | Christopher</p>
      </footer>
    </React.Fragment>
  );
}