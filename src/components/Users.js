import { useState, useEffect } from "react";
import axios from "../api/axios";

const Users = () => {
    const [ users, setUsers ] = useState();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axios.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
                // 11.48
            } catch(err) {
                console.error(err);
            }
        }
    }, []);

    return (
        <article>
            <h2>Liste des utilisateurs :</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>Aucun utilisateur à afficher</p>
            }
        </article>
    )
}

export default Users;