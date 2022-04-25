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
import Users from "./components/Users";
import Profil from "./components/Profil";
import Publish from "./components/Publish";
import Unauthorized from "./components/Unauthorized";

export default function App() {
  
  return (
    <React.Fragment>
      <Header />
      <main>
      <Routes>
          <Route path='/' element={<Accueil />} />
          <Route element={<RequireAuth allowedRoles={["subscriber", "editor", "administrator"]}/>}>
            <Route path='/cours' element={<Cours />} />
            <Route path='/:slug' element={<AfficherCours />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["editor", "administrator"]}/>}>
            <Route path='/utilisateurs' element={<Users />} />
            <Route path='/publier' element={<Publish />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["subscriber", "editor", "administrator"]}/>}>
            <Route path='/profil' element={<Profil />} />
            <Route path='/deconnexion' element={<Logout />} />
          </Route>
          <Route path='/inscription' element={<Register />} />
          <Route path='/connexion' element={<Login />} />
          <Route path='/interdit' element={<Unauthorized />} />
      </Routes>
      </main>
      <footer>
        <p>Nicolas | Damirdine | Christopher</p>
      </footer>
    </React.Fragment>
  );
}