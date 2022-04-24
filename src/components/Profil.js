import { useState, useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "../hooks/useAuth";

const Profil = () => {
  const [userFirsname, setUserFirsname ] = useState();
  const [userLastname, setUserLastname ] = useState();
  const [userDisplayname, setUserDisplayname ] = useState();
  const [userRole, setUserRole ] = useState();
  const [userEmail, setUserEmail ] = useState();
  // Reset pwd avec matchPwd

  const { auth } = useAuth();

  useEffect(() => {

    const getProfil = async () => {
      try {
        const getData = await axiosPrivate.get(`wp/v2/users/${auth.id}?context=edit`);
        console.log(getData.data);
        setUserFirsname(getData.data.first_name);
        setUserLastname(getData.data.last_name);
        setUserDisplayname(getData.data.name);
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
});

  return (
    <section className="profil">
      <h2>Page de profil</h2>

      <section className="infos">
      <h4>Informations personnelles :</h4>
        <form>
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
            </label>
            <input 
              type="text" 
              id="firsname"
              value={userFirsname}
              onChange={(e) => setUserFirsname(e.target.value)}
            />
          </div>
          <div className="line">
            <label htmlFor="lastname">
              Nom :
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
              Nom à afficher :
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
            </label>
            <input 
              type="text" 
              id="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <button className="form-btn">Mettre à jour mes informations</button>

          <h4>Changer mon mot de passe :</h4>
          <form>
            <div className="line">
              <label>
                Mot de passe actuel
              </label>
              <input
                type="password"
                id="" />
            </div>
            <div className="line">
              <label>
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="" />
            </div>
            <div className="line">
              <label>
                Confirmation
              </label>
              <input
                type="password"
                id="" />
            </div>
            <button className="form-btn">Changer mon mot de passe</button>
          </form>
          <hr />
        </form>
      </section>

      <section className="liste-cours">
        <h4>Liste des cours suivis :</h4>
      </section>
    </section>
  )
}

export default Profil;