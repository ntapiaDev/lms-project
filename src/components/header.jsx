
import React, { useState } from "react"
import {
    Link
} from "react-router-dom";

import logo from '../assets/images/logo-lms.png'; 
import icon_nav from '../assets/images/icon-nav.svg'; 
import useAuth from "../hooks/useAuth";


export default function Header() {

    const [navbarOpen, setNavbarOpen] = useState(false)
    const { auth } = useAuth();

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }
    const closeMenu = () => {
        setNavbarOpen(false)
    }

    return (
        <header>
        <div className="logo-div">
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
            {!auth.user ? 
              <><li className="button-inscription">
                  <Link to="/inscription" >S'inscrire</Link>
                </li>
                <li className="button-connexion">
                  <Link to="/connexion">Se connecter</Link>
                </li>
              </> 
            : <li className="button-deconnexion">
                <Link to="/deconnexion">Se déconnecter</Link>
              </li>
            }
          </ul>
        </nav>

        <nav id="nav-mobile" className="navBar">

          <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
            <li>
              <Link to="/"  onClick={() => closeMenu()} >Accueil</Link>
            </li>
            <li>
              <Link to="/cours"  onClick={() => closeMenu()} >Liste des cours</Link>
            </li>
            {!auth.user ? 
              <><li>
                  <Link to="/inscription" onClick={() => closeMenu()}>S'inscrire</Link>
                </li>
                <li>
                  <Link to="/connexion" onClick={() => closeMenu()}>Se connecter</Link>
                </li>
              </> 
            : <li>
                <Link to="/deconnexion" onClick={() => closeMenu()}>Se déconnecter</Link>
              </li>
            }
          </ul>
        </nav>

      </header>
    );
        
}



