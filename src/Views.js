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
import AfficherCours from "./components/affichercours.js";

const Views = () => {
    return(
        <Routes>
            <Route path='/' element={<Accueil />} />
            <Route path='/cours' element={<Cours />} />
            <Route path='/inscription' element={<Inscription />} />
            <Route path='/connexion' element={<Connexion />} />
            <Route path='/:slug' element={<AfficherCours />} />
        </Routes>
    );
};

export default Views;