
import { useState, useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "../hooks/useAuth";




const Publish = () => {

    const { auth } = useAuth();
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDuration, setCourseDuration] = useState('');
    const [courseImagePresentation, setCourseImagePresentation] = useState('');
    const [courseContent, setCourseContent] = useState('');
  

    const handleSubmit = (event) => {
      event.preventDefault()
      const response = axiosPrivate.post('wp/v2/posts',
      {
          title: courseTitle,
          acf: {
            course_duration: courseDuration,
            instructor_name: auth.displayname,
          },
          status: "publish",
          
          content: courseContent,
      });
      console.log(response);
    };


    // const handleFileInput = (event) => {
    //   console.log(event);
    // };



    return  (<>
              <h2>Ajouter un cours</h2>
              <form className="publish-form" onSubmit={handleSubmit}>
                <label
                  htmlFor="title">
                    Titre du cours
                </label>
                <input
                  name="courseTitle"
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)} 
                  id="title"
                  required/>
                <label
                  htmlFor="content">
                    Durée du cours (en heures)
                </label>
                <input
                  name="courseDuration"
                  type="number"
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(e.target.value)} 
                  id="duration"
                  required/>
                {/* <label
                  htmlFor="content">
                    Image de présentation : 
                </label>
                <input
                  name="courseImagePresentation"
                  type="file"
                  value={this.state.courseImagePresentation}
                  onChange={this.handleFileInput} 
                  id="imagepresentation"
                  required/> */}
                <label
                  htmlFor="content">
                    Contenu
                </label>
                <textarea
                  name="courseContent"
                  value={courseContent}
                  onChange={(e) => setCourseContent(e.target.value)} 
                  id="content"
                  rows="20"
                  required>{courseContent}</textarea>
                <button className="form-btn" >Valider</button>
            </form>
            </>) 
}



export default Publish;