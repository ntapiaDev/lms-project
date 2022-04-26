import { useState, useEffect } from "react";
import axios, { axiosPrivate } from "../api/axios";
import useAuth from "../hooks/useAuth";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from 'html-react-parser';
import {
  Link
} from "react-router-dom";


const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Profil = () => {
  const [userFirstname, setUserFirstname ] = useState('');
  const [validFirstname, setValidFirstname ] = useState(false);

  const [userLastname, setUserLastname ] = useState('');
  const [validLastname, setValidLastname ] = useState(false);

  const [userDisplayname, setUserDisplayname ] = useState('');
  const [validDisplayname, setValidDisplayname ] = useState(false);

  const [userRole, setUserRole ] = useState('');

  const [userEmail, setUserEmail ] = useState('');
  const [validUserEmail, setValidvalidUserEmail ] = useState(false);
  
  const [oldPassword, setOldPassword ] = useState('');
  const [validOldPwd, setValidOldPwd] = useState(false);
  const [newPassword, setNewPassword ] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [matchPassword, setMatchPassword ] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [classesName, setClassesName] = useState('');
  const [classesLink, setClassesLink] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [succMsg, setSuccMsg] = useState('');

  const { auth } = useAuth();

  useEffect(() => {
    const result = USER_REGEX.test(userFirstname);
    setValidFirstname(result);
  }, [userFirstname])

  useEffect(() => {
    const result = USER_REGEX.test(userLastname);
    setValidLastname(result);
  }, [userLastname])

  useEffect(() => {
    const result = USER_REGEX.test(userDisplayname);
    setValidDisplayname(result);
  }, [userDisplayname])

  useEffect(() => {
    const result = EMAIL_REGEX.test(userEmail);
    setValidvalidUserEmail(result);
  }, [userEmail])

  useEffect(() => {
    const result = PWD_REGEX.test(oldPassword);
    setValidOldPwd(result);
  }, [oldPassword])

  useEffect(() => {
    const result = PWD_REGEX.test(newPassword);
    setValidPwd(result);
    const match = newPassword === matchPassword;
    setValidMatch(match);
  }, [newPassword, matchPassword])

  useEffect(() => {
    const getProfil = async () => {
      try {
        const getData = await axiosPrivate.get(`wp/v2/users/${auth.id}?context=edit`);
        setUserFirstname(getData.data.first_name);
        setUserLastname(getData.data.last_name);
        setUserDisplayname(getData.data.nickname);

        // Récupération des infos de cours
        let classesNames = [];
        let classesLinks = [];
        try {
          for (let i = 0; i < getData.data.acf.followed_class.split(',').length; i++) {
            const getClasses = await axios.get(`wp/v2/posts/${getData.data.acf.followed_class.split(',')[i]}`);
            classesNames.push(getClasses.data.title.rendered);
            classesLinks.push(getClasses.data.link);
          }
          setClassesName(classesNames);
          setClassesLink(classesLinks);
        } catch (err) {
          console.log(err);
        }

        if (getData.data.roles[0] === 'subscriber') {
          setUserRole('Élève')
        } else if (getData.data.roles[0] === 'editor') {
          setUserRole('Professeur')
        } else if (getData.data.roles[0] === 'administrator') {
          setUserRole('Administrateur')
        } else {
          setUserRole('Non défini')
        }
        setUserEmail(getData.data.email);
        
      } catch(err) {
        console.error(err);
      }
    }
    getProfil();
  }, [auth.id]);

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    const v1 = userFirstname !== '' ? USER_REGEX.test(userFirstname) : true;
    const v2 = userLastname !== '' ? USER_REGEX.test(userLastname) : true;
    const v3 = userDisplayname !== '' ? USER_REGEX.test(userDisplayname) : true;
    const v4 = EMAIL_REGEX.test(userEmail);
    if (!v1 || !v2 || !v3 || !v4 ) {
      setErrMsg("Entrées invalides");
      setSuccMsg('');
      return;
    }
    
    try {
      const response = await axiosPrivate.post(`wp/v2/users/${auth.id}`,
        {
          first_name: userFirstname,
          last_name: userLastname,
          nickname: userDisplayname,
          email: userEmail
        });
      console.log(response);
      setErrMsg('');
      setSuccMsg("Informations mises à jour");
    } catch (err) {
      console.log(err)
    }
  }

  const handlePwdSubmit = async (e) => {
    e.preventDefault();
    const v1 = PWD_REGEX.test(oldPassword);
    const v2 = PWD_REGEX.test(newPassword);
    const v3 = PWD_REGEX.test(matchPassword);
    if (!v1 || !v2 || !v3 ) {
      setErrMsg("Entrées invalides");
      setSuccMsg('');
      return;
    }
    try {
      // Check de l'ancien mot de passe :
      const checkPwd = await axios.post(`jwt-auth/v1/token`,
        {
            username: auth.user,
            password: oldPassword,
        },
        {   
            headers: {
                'Content-Type': 'application/json'
            }
        });
      // Mise à jour du nouveau mot de passe :
      const response = await axiosPrivate.post(`wp/v2/users/${auth.id}`,
        {
          password: newPassword
        });
      console.log(response);
      setErrMsg('')
      setSuccMsg("Mot de passe mis à jour");
    } catch (err) {
      if (err.response.status === 403) {
        setErrMsg("Mot de passe incorrect");
        setSuccMsg('')
      } else {
        setErrMsg("Échec de la mise à jour");
      }
    }
  }

  return (
    <section className="profil">
      <h2>Page de profil</h2>

      <section className="infos">
        <h4>Informations personnelles :</h4>
        <p className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <p className={succMsg? "succmsg" : "offscreen"} aria-live="assertive">{succMsg}</p>
        <form onSubmit={handleInfoSubmit}>
          <div className="line">
            <label htmlFor="user">
              Utilisateur :
            </label>
            <input 
              type="text"
              id="user"
              value={auth.user}
              disabled
            />
          </div>
          <div className="line">
            <label htmlFor="firstname">
              Prénom :
              <FontAwesomeIcon icon={faCheck} className={validFirstname ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validFirstname || !userFirstname ? "hide" : "invalid"} />
            </label>
            <input 
              type="text" 
              id="firstname"
              value={userFirstname}
              onChange={(e) => setUserFirstname(e.target.value)}
            />
          </div>
          <div className="line">
            <label htmlFor="lastname">
              Nom :
              <FontAwesomeIcon icon={faCheck} className={validLastname ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validLastname || !userLastname ? "hide" : "invalid"} />
            </label>
            <input 
              type="text" 
              id="lastname"
              value={userLastname}
              onChange={(e) => setUserLastname(e.target.value)}
            />
          </div>
          <div className="line">
            <label htmlFor="displayname">
            Pseudonyme :
            <FontAwesomeIcon icon={faCheck} className={validDisplayname ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validDisplayname || !userDisplayname ? "hide" : "invalid"} />
            </label>
            <input 
              type="text" 
              id="displayname"
              value={userDisplayname}
              onChange={(e) => setUserDisplayname(e.target.value)}
            />
          </div>
          <div className="line">
            <label htmlFor="role">
              Rôle :
            </label>
            <input 
              type="text" 
              id="role"
              value={userRole}
              disabled
            />
          </div>
          <div className="line">
            <label htmlFor="email">
              Adresse email :
              <FontAwesomeIcon icon={faCheck} className={validUserEmail ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validUserEmail || !userEmail ? "hide" : "invalid"} />
            </label>
            <input 
              type="text" 
              id="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <button className="form-btn">Mettre à jour mes informations</button>
        </form>

        <h4>Changer mon mot de passe :</h4>
        <form onSubmit={handlePwdSubmit}>
          <div className="line">
            <label htmlFor="password">
              Mot de passe actuel
              <FontAwesomeIcon icon={faCheck} className={validOldPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validOldPwd || !oldPassword ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
              required />
          </div>
          <div className="line">
          <label htmlFor="newPwd">
              Nouveau mot de passe
              <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validPwd || !newPassword ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="newPwd"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required />
          </div>
          <div className="line">
          <label htmlFor="matchPwd">
              Confirmation
              <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="matchPwd"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              required />
          </div>
          <button className="form-btn">Changer mon mot de passe</button>
        </form>
      </section>

      <section className="liste-cours">
        <h4>Liste des cours suivis :</h4>
        {classesName?.length
          ? (
              <ul>
                  {classesName.map((clas, i) => <li key={i}><a href={classesLink[i]}>{classesName[i]}</a></li>)}
              </ul>
          ) : <p>Aucun cours à afficher</p>
        }
      </section>

      <MesCours />
    </section>
  )
}



const MesCours = () => {

  const { auth } = useAuth();
  const [CourseListInstructor, setCourseListInstructor] = useState('');
  const [CourseListInstructorLink, setCourseListInstructorLink] = useState('');
  const [CourseEditLink, setCourseEditLink] = useState('');
  const [CourseID, setCourseID] = useState('');
  const [CourseDelete, setCourseDelete] = useState(true);

  // useEffect(() => {
  //   const result = PWD_REGEX.test(oldPassword);
  //   setValidOldPwd(result);
  // }, [oldPassword])

  useEffect(() => {
    const getCourses = async () => {
      try {
        const getCourseInstructor = await axiosPrivate.get(`wp/v2/posts/?author=${auth.id}`);
        // Récupération des infos de cours
        let CourseListInstructor = [];
        let CourseListInstructorLink = [];
        let CourseEditLink = [];
        let CourseID = [];
        for (let i = 0; i < getCourseInstructor.data.length; i++) {
          CourseListInstructor.push(getCourseInstructor.data[i].title.rendered);
          CourseListInstructorLink.push(getCourseInstructor.data[i].link);
          CourseEditLink.push(`../${getCourseInstructor.data[i].slug}/edit`);
          CourseID.push(getCourseInstructor.data[i].id);
        }
        setCourseListInstructor(CourseListInstructor);
        setCourseListInstructorLink(CourseListInstructorLink);
        setCourseEditLink(CourseEditLink);
        setCourseID(CourseID);
        setCourseDelete(true);
      } catch(err) {
        console.error(err);
      }
    }
    getCourses();
  }, [auth.id, CourseDelete]);



  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(event);
    const response = await axiosPrivate.delete(`wp/v2/posts/${event.target.id}`);
    console.log(response);
    setCourseDelete(false);

  };



  return(
    
      <>
      {auth.roles[0] === 'editor' || auth.roles[0] === 'administrator' ?
        <>
          <section className="liste-cours-instructor">
            <h4>Mes cours créés</h4>
            {CourseListInstructor?.length
              ? (
                  <ul>
                      {CourseListInstructor.map((clas, i) => 
                      <li key={i} className="cours-instructor">
                        <a href={CourseListInstructorLink[i]}>{parse(CourseListInstructor[i])}</a>
                        <div className="button-list">
                          <Link to={CourseEditLink[i]} ><button >Editer</button></Link>
                          <button  id={CourseID[i]} onClick={handleSubmit}>Supprimer</button>
                        </div>
                      </li>
                      )}

                  </ul>
              ) : <p>Aucun cours à afficher</p>
            }
            <Link to="/publier" ><button className="form-btn" id="ajouter-cours-bouton">Ajouter un cours</button></Link>
          </section>
        </>
        : 
        '' }

      </>

  )


}


export default Profil;