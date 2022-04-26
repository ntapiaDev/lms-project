import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { axiosPrivate } from "../api/axios"
import useAuth from "../hooks/useAuth"

const ProfilClass = ({className, classLink, classList, setRemovedClass}) => {
    const { auth } = useAuth();

    const deleteClass = async (i) => {
        let index = classList.indexOf(classList[i]);
        classList.splice(index, 1);
        try {
            await axiosPrivate.post(`wp/v2/users/${auth.id}`,
            {
                acf: {
                    'followed_class': classList.toString()
                }
            });
        setRemovedClass(classList);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className="liste-cours">
            <h4>Liste des cours suivis :</h4>
            {className?.length
                ? <ul>{className?.map((classe, i) => <li key={i}><a href={classLink[i]}>{classe}</a> <FontAwesomeIcon icon={faTimes} className="invalid pointer" onClick={() => deleteClass(i)} /></li>)}</ul>
                : <p>Aucun cours à afficher</p>
            }
         </section>
    )
}

export default ProfilClass