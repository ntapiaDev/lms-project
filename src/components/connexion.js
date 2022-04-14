import React from "react";
import {
    Link
} from "react-router-dom";

export default class Connexion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loginValue: '',
            passwordValue: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        if (e.target.placeholder === "Identifiant") {
            this.setState({loginValue: e.target.value});
        } else if (e.target.placeholder === "Mot de passe")
            this.setState({passwordValue: e.target.value});
    }
    handleSubmit(e) {
        console.log("Login = " + this.state.loginValue + " - Mot de passe = " + this.state.passwordValue);
        e.preventDefault(); 
    }

    render() {
        return <section className="connexion-module">
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Identifiant" value={this.state.loginValue} onChange={this.handleChange}/>
                <input type="password" placeholder="Mot de passe" value={this.state.passwordValue} onChange={this.handleChange}/>
                <input type="submit" value="Se connecter" className="connexion-btn"/>
            </form>
            <div className="inscription">
                <div>
                    <Link to="/inscription">Créer un compte</Link>
                </div>
            </div>
        </section>
    }
}