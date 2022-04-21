import React from "react";
import useAuth from "../hooks/useAuth";

import Cours from "./cours";

function Accueil() {

    const { auth } = useAuth();

        return (
            <div>
                <h1>Bienvenue sur LMS Projet</h1>
                <p>{auth?.user ? `Bonjour ${auth?.user}, vous êtes connecté.` : ''}</p>
                <Cours />
            </div>
        );
}

export default Accueil;