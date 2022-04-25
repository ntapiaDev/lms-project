import { useState, useEffect, useRef } from "react";
import axios, { axiosPrivate } from "../api/axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Users = () => {
    console.log('users page');
    const [ users, setUsers ] = useState();
    const [ classesInfo, setClassesInfo ] = useState();
    const listRef = useRef(); 

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('wp/v2/users?context=edit');
                setUsers(response.data);

                // Récupération des infos de cours
                let classesInfos = [];
                for (let i = 0; i < response.data.length; i++) {
                    for (let k = 0; k < response.data[i].acf.followed_class.split(',').length; k++) {
                        const getClasses = await axios.get(`wp/v2/posts/${response.data[i].acf.followed_class.split(',')[k]}`);
                        console.log(i);
                        classesInfos.push([['userId', i], ['classesName', getClasses.data.title.rendered], ['classesLink', getClasses.data.link]]);
                    }
                    setClassesInfo(classesInfos); 
                }
            } catch(err) {
                console.error(err);
            }
        }

        getUsers();
        console.log(classesInfo);
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
                        {users?.map((user, i) => <li key={i}><strong>{user.name}</strong> - {user.email} -
                            {user.roles[0] === 'subscriber' ? <span style={{color: "blue"}}> Élève </span> : ''}
                            {user.roles[0] === 'editor' ? <span style={{color: "green"}}> Professeur </span> : ''}
                            {user.roles[0] === 'administrator' ? <span style={{color: "red"}}> Administrateur </span> : ''}
                        <FontAwesomeIcon icon={faTimes} className="invalid pointer" onClick={() => deleteUser(user?.id, i)} /><br />
                        <p>Cours suivis :</p>
                        <ul>
                            {/* {classesInfo?.map((classe, k) => <li key={k}>{classe[0][1] === i ? classe[1][1] : ''}</li>)} */}
                            {classesInfo?.map((classe, k) => classe[0][1] === i ? <li key={k}>{classe[1][1]}</li> : '')}
                        </ul>
                        </li>)}
                    </ul>
                ) : <p>Aucun utilisateur à afficher</p>
            }
        </article>
    )
}

export default Users;