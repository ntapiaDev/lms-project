import React from "react";
import {
    Link
} from "react-router-dom";
import './connexion.css';

export default class Inscription extends React.Component {
    render() {
        return <section className="inscription-module">
            <form>
                <input type="text" name="lastname" id="lastname" placeholder="Nom"/>
                <input type="text" name="firstname" id="firstname" placeholder="Prénom"/>
                <input type="text" name="login" id="login" placeholder="Identifiant"/>
                <input type="password" name="password" id="password" placeholder="Mot de passe"/>
                <input type="submit" value="S'inscrire" className="inscription-btn"/>
            </form>
            <div className="connexion">
                <Link to="/connexion">J'ai déjà un compte</Link>
            </div>
        </section>
    }
}