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
            console.log(coursListe[0]);
            let titlecours = coursListe[0].title.rendered
            let cours = coursListe[0].content.rendered
            return (
                
                <div class="cours-content">
                    <h1>{ parse(titlecours) }</h1>
                    { parse(cours) }
                </div>
            );
        }
    }
}