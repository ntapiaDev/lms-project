import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios, { axiosPrivate } from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Récupération du token
        try {
            const response = await axios.post(`jwt-auth/v1/token`,
            {
                username: user,
                password: pwd,
            },
            {   
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const accessToken = response?.data?.token;

            // Récupération du role
            const responseRole = await axiosPrivate.get(`wp/v2/users?context=edit`);
            let roles = '';
            for (let i = 0; i < responseRole.data.length; i++) {
                if (responseRole?.data[i].name === user) {
                    roles = responseRole?.data[i].roles[0]
                }
            };
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from !== '/deconnexion' ? from : "/", { replace: true });
        } catch (err) {
            console.log(err.response.data.data);
            if (!err?.response) {
                setErrMsg('Le serveur ne répond pas');
            } else if (err.response?.data.data.errorCode === 48) {
                setErrMsg('Mauvais nom d\'utilisateur ou mot de passe');
            } else {
                setErrMsg('Échec de l\'authentification');
            }
            errRef.current.focus();
        }
    }

    return(
        <section className="login">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Nom d'utilisateur :</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor="password">Mot de passe :</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button className="form-btn" disabled={user === '' || pwd === '' ? true : false}>Se connecter</button>
            </form>
            <p>
                Pas encore de compte ?<br />
                <span className="line">
                    <Link to="../inscription">S'enregistrer</Link>
                </span>
            </p>
        </section>
    )
};

export default Login;