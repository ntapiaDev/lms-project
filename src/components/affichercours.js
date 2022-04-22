import React from "react";
import parse from 'html-react-parser';

export default class AfficherCours extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            coursListe: [],
            isLoaded : false,
        };
    }
    
    componentDidMount() {
        fetch('https://projet-lms-afpa.000webhostapp.com/wp-json/wp/v2/cours/')
            .then(response => response.json())
            .then(data => this.setState({ coursListe: data, isLoaded : true }));
        
    }

    render() {
        const {isLoaded, coursListe} = this.state;
        if(!isLoaded){
            return  <div class="loading">
                        <p>Chargement…</p>
                    </div>;
        }
        else if (isLoaded){
            let titlecours
            let cours
            let slug = window.location.pathname.slice(1)
            for (let i = 0; i < coursListe.length; i++) {
                if (coursListe[i].slug === slug) {
                    titlecours = coursListe[i].title.rendered
                    cours = coursListe[i].content.rendered
                }
            }
            return (
                
                <div class="cours-content">
                    <h1>{ parse(titlecours) }</h1>
                    { parse(cours) }
                </div>
            );
        }
    }
}