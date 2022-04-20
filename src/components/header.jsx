
import React, { useState } from "react"
import {
    Link
} from "react-router-dom";

import logo from '../assets/images/logo-lms.png'; 
import icon_nav from '../assets/images/icon-nav.svg'; 


export default function Header() {

    const [navbarOpen, setNavbarOpen] = useState(false)

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }
    const closeMenu = () => {
        setNavbarOpen(false)
    }

    return (
        <header>
        <div class="logo-div">
          <Link to="/"><img src={logo} alt="Logo de l'application" /></Link>
          
          <button id="nav-mobile-button" onClick={handleToggle}>
            <img src={icon_nav}/>
          </button>
        </div>
        <nav  id="nav-desktop">
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

        <nav id="nav-mobile" className="navBar">

          <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
            <li>
              <Link to="/" activeClassName="active-link" onClick={() => closeMenu()} exact>Accueil</Link>
            </li>
            <li>
              <Link to="/cours" activeClassName="active-link" onClick={() => closeMenu()} exact>Liste des cours</Link>
            </li>
            <li>
              <Link to="/inscription" activeClassName="active-link" onClick={() => closeMenu()} exact>S'inscrire</Link>
            </li>
            <li>
              <Link to="/connexion" activeClassName="active-link" onClick={() => closeMenu()} exact>Se connecter</Link>
            </li>
          </ul>
        </nav>

      </header>
    );
        
}



