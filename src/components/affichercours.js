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
        fetch('https://www.leroyalmonceau.com/wp-json/wp/v2/posts')
            .then(response => response.json())
            .then(data => this.setState({ coursListe: data, isLoaded : true }));
        
    }

    render() {
        const {isLoaded, coursListe} = this.state;
        if(!isLoaded){
            return <div>Chargement…</div>;
        }
        else if (isLoaded){
            let cours
            let slug = window.location.pathname.slice(1)
            for (let i = 0; i < coursListe.length; i++) {
                if (coursListe[i].slug === slug) {
                    cours = coursListe[i].content.rendered
                    console.log(cours);
                }
            }
            return (
                <div>
                    { parse(cours) }
                </div>
            );
        }
    }
}