import React from "react";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
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