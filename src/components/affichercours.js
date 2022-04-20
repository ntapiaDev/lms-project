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
        fetch('http://lms-project/wp-json/learnpress/v1/courses')
            .then(response => response.json())
            .then(data => this.setState({ coursListe: data, isLoaded : true }));
        
    }

    render() {
        const {isLoaded, coursListe} = this.state;
        if(!isLoaded){
            return <div>Chargement…</div>;
        }
        else if (isLoaded){
            let titlecours
            let cours
            let slug = window.location.pathname.slice(1)
            console.log(coursListe);
            for (let i = 0; i < coursListe.length; i++) {
                if (coursListe[i].slug === slug) {
                    titlecours = coursListe[i].name
                    cours = coursListe[i].content
                    console.log(cours);
                }
            }
            return (
                
                <div>
                    <h1>{ parse(titlecours) }</h1>
                    { parse(cours) }
                </div>
            );
        }
    }
}