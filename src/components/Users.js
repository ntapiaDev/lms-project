import { useState, useEffect } from "react";
import { axiosPrivate } from "../api/axios";

const Users = () => {
    const [ users, setUsers ] = useState();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('wp/v2/users?context=edit');
                console.log(response.data);
                setUsers(response.data);
            } catch(err) {
                console.error(err);
            }
        }
        
        getUsers();
    }, []);

    return (
        <article className="userlist">
            <h2>Liste des membres :</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.name} - {user?.email} - {user?.roles[0]}</li>)}
                    </ul>
                ) : <p>Aucun utilisateur à afficher</p>
            }
        </article>
    )
}

export default Users;