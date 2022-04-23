import { useState, useEffect } from "react";
import axios from "../api/axios";

const Users = () => {
    const [ users, setUsers ] = useState();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('wp/v2/users?context=edit', 
                {   
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3dvcmRwcmVzcyIsImlhdCI6MTY1MDYyNzQ1MSwibmJmIjoxNjUwNjI3NDUxLCJleHAiOjE2NTEyMzIyNTEsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.LOEx1gC6aYjiZo-Di1dFRgEgkytqtS7DjxQi0aeT6fs`
                    }
                });
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