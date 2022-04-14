import React from "react";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Views from "./Views";
import logo from './assets/images/logo-lms.png'; 

export default function App() {
  return (
    <Router>
      <React.Fragment>
        <header>
          <div>
            <img src={logo} alt="Logo de l'application" />
          </div>
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


