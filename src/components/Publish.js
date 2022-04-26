

import React from "react";
import { axiosPrivate } from "../api/axios";




export default class Publish extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          courseTitle: null,
          courseDuration: null,
          courseImagePresentation: null,
          courseContent: null

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value
        this.setState({
          [name]: value
        });
    }

    handleFileInput(event) {
      console.log(event);
    }

    handleSubmit(event) {
      event.preventDefault()
      const response = axiosPrivate.post('wp/v2/posts',
      {
          title: this.state.courseTitle,
          acf: {
            course_duration: this.state.courseDuration
          },
          status: "publish",
          content: this.state.courseContent,
      });
      console.log(response);
    }


    render() {
        return  <form className="publish-form" onSubmit={this.handleSubmit}>
                    <label
                      htmlFor="title">
                        Titre du cours : 
                    </label>
                    <input
                      name="courseTitle"
                      type="text"
                      value={this.state.courseTitle}
                      onChange={this.handleInputChange} 
                      id="title"
                      required/>
                    <label
                      htmlFor="content">
                        Durée du cours : 
                    </label>
                    <input
                      name="courseDuration"
                      type="number"
                      value={this.state.courseDuration}
                      onChange={this.handleInputChange} 
                      id="duration"
                      required/>
                    <label
                      htmlFor="content">
                        Image de présentation : 
                    </label>
                    <input
                      name="courseImagePresentation"
                      type="file"
                      value={this.state.courseImagePresentation}
                      onChange={this.handleFileInput} 
                      id="imagepresentation"
                      required/>
                    <label
                      htmlFor="content">
                        Contenu : 
                    </label>
                    <textarea
                      name="courseContent"
                      value={this.state.courseContent}
                      onChange={this.handleInputChange} 
                      id="content"
                      rows="30"
                      required>{this.state.courseContent}</textarea>
                    <button className="form-btn" >Valider</button>
                </form>
                
    }
}