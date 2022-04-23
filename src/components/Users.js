import { useState, useEffect, useRef } from "react";
import { axiosPrivate } from "../api/axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Users = () => {
    const [ users, setUsers ] = useState();
    const listRef = useRef();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('wp/v2/users?context=edit');
                setUsers(response.data);
            } catch(err) {
                console.error(err);
            }
        }

        getUsers();
    }, []);

    const deleteUser = (id, i) => {
        axiosPrivate.delete(`wp/v2/users/${id}?reassign=1&force=true`);
        listRef.current.children[i].style.display = 'none';
    }

    return (
        <article className="userlist">
            <h2>Liste des membres :</h2>
            {users?.length
                ? (
                    <ul ref={listRef}>
                        {users.map((user, i) => <li key={i}>{user.name} - {user.email} -
                            {user.roles[0] === 'subscriber' ? <span style={{color: "blue"}}> Élève </span> : ''}
                            {user.roles[0] === 'editor' ? <span style={{color: "green"}}> Professeur </span> : ''}
                            {user.roles[0] === 'administrator' ? <span style={{color: "red"}}> Administrateur </span> : ''}
                        <FontAwesomeIcon icon={faTimes} className="invalid pointer" onClick={() => deleteUser(user?.id, i)} /></li>)}
                    </ul>
                ) : <p>Aucun utilisateur à afficher</p>
            }
        </article>
    )
}

export default Users;