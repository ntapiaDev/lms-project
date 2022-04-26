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
        let slug = window.location.pathname.slice(1)
        fetch(`http://decouvertewordpress/wp-json/wp/v2/posts/?slug=${slug}`)
        // fetch(`https://projet-lms-afpa.000webhostapp.com/wp-json/wp/v2/cours/?slug=${slug}`)
            .then(response => response.json())
            .then(data => this.setState({ coursListe: data, isLoaded : true }));
        
    }

    render() {
        const {isLoaded, coursListe} = this.state;
        if(!isLoaded){
            return  <div className="loading">
                <p>Chargement…</p>
            </div>;
        }
        else if (isLoaded){
            let titlecours = coursListe[0].title.rendered
            let cours = coursListe[0].content.rendered
            return (
                
                <div className="cours-content">
                    <h1>{ parse(titlecours) }</h1>
                    { parse(cours) }
                </div>
            );
        }
    }
}