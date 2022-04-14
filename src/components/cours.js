import { render } from "@testing-library/react";
import React from "react";
import {
    Link
} from "react-router-dom";

class CoursRow extends React.Component {
    render() {
        const cours = this.props.cours;
        const coursLink = `../${cours.slug}`;
        return(
            <Link to={coursLink}>
                <div className="cours-item">
                    <h3>{cours.title.rendered}</h3>
                    <p>Auteur : {cours.author}</p>
                    
                    <p>date : {cours.date}</p>
                    
                    <br/>
                </div>
            </Link>

        );
    }
}


class CoursTable extends React.Component {
    

    render() {
        
        const rows = [];
        if(this.props.coursListe != null){
            this.props.coursListe.forEach((cours) => {
                rows.push(
                    <CoursRow cours={cours} key={cours.id} />
                );
            })
                return(
                    <div className="cours-list">
                        {rows}
                    </div>
                );
        }
        else{
            return <div></div>;
        }

    }
}




class Cours extends React.Component {

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
            return (
                <div>
                    <h2>Cours disponibles</h2> 
                    <CoursTable coursListe={coursListe}/>
                </div>
            );
        }
    }
}

export default Cours;