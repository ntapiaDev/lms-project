import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Accueil from "./components/accueil";
import Cours from "./components/cours";
import Connexion from "./components/connexion";
import Inscription from "./components/inscription";
import Views from "./Views";

export default function App() {
  return (
    <Router>
      <React.Fragment>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/cours">Liste des cours</Link>
              </li>
              <li>
                <Link to="/inscription">S'inscrire</Link>
              </li>
              <li>
                <Link to="/connexion">Se connecter</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Views/>
        </main>
      </React.Fragment>
    </Router>
  );
}