import { render } from "@testing-library/react";
import React from "react";

import Cours from "./cours";



function Accueil() {

        return 
            <div>
                <h1>Bienvenue sur LMS Projet</h1> 
                <Cours />
            </div>;
}


export default Accueil;