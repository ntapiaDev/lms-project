import { useState, useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UsersClass from "./UsersClass";
import useAuth from "../hooks/useAuth";

const Users = () => {
    const [ users, setUsers ] = useState();
    const [ userDeleted, setUserDeleted] = useState(0);
    const { auth } = useAuth();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('wp/v2/users?context=edit');
                setUsers(response.data);
                console.log('refresh');

            } catch(err) {
                console.error(err);
            }
        }
        getUsers();
    }, [userDeleted]);

    const deleteUser = async (id) => {
        await axiosPrivate.delete(`wp/v2/users/${id}?reassign=1&force=true`);
        setUserDeleted(userDeleted + 1);
    }

    return (
        <article className="userlist">
            <h2>Liste des membres :</h2>
            {users?.length
                ? (
                    <ul>
                        {users?.map((user, i) => <li key={i}><strong>{user.name}</strong> - {user.email} -
                            {user.roles[0] === 'subscriber' ? <span style={{color: "blue"}}> Élève </span> : ''}
                            {user.roles[0] === 'editor' ? <span style={{color: "green"}}> Professeur </span> : ''}
                            {user.roles[0] === 'administrator' ? <span style={{color: "red"}}> Administrateur </span> : ''}
                        {auth.roles[0] === 'administrator' ? <FontAwesomeIcon icon={faTimes} className="invalid pointer" onClick={() => deleteUser(user?.id)} /> : ''}<br />
                        <p>Cours suivis :</p>
                        {user.acf.followed_class !== '' ? <UsersClass followed_class={user.acf.followed_class}/> : 'Aucun cours suivi actuellement'}
                        </li>)}
                    </ul>
                ) : <p>Aucun utilisateur à afficher</p>
            }
        </article>
    )
}

export default Users;

// Passer les cours dans une même variable que les users et les map ensemble...