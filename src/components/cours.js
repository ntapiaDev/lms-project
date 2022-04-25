
import React from "react";
import parse from 'html-react-parser';
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
                    <div className="cours-image">
                        <img src={cours.acf.course_image} alt='' />
                    </div>
                    <div className="cours-description">
                        <h3>{parse(cours.title.rendered)}</h3>
                        {parse(cours.excerpt.rendered)}
                        <div className="cours-footer">
                            <p>Par <span className="cours-instructor">{cours.acf.instructor}</span></p>
                            <p>⏱ {cours.acf.course_duration}h</p>
                        </div>
                    </div>
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
        fetch('https://projet-lms-afpa.000webhostapp.com/wp-json/wp/v2/cours')
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
            return (
                <div className="cours-container">
                    <h2>Cours disponibles</h2> 
                    <CoursTable coursListe={coursListe}/>
                </div>
            );
        }
    }
}

export default Cours;