import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const AUTH_KEY_SUB = 'lFP18oU3XNQh8t1rLmlVMjrt7QJTI73k';
const AUTH_KEY_EDI = 'DYfjnodinWbVaN9BLsl5YZsO1s9MPpiS';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const [role, setRole] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    // Élève ou prof
    const eleveRef = useRef();
    const profRef = useRef();
    const handleCheckbox = (ref) => {
        if (ref === 'subscriber') {
            profRef.current.checked = false;
        } else {
            eleveRef.current.checked = false;
        }

        if (eleveRef.current.checked || profRef.current.checked ) {
            setRole(ref);
        } else {
            setRole('');
        }        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        
        try {
            const response = await axios.post('wp/v2/users',
                {
                    username: user,
                    password: pwd,
                    email: email,
                    roles: [
                        role
                    ]
                },
                {   
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3dvcmRwcmVzcyIsImlhdCI6MTY1MDYyNzQ1MSwibmJmIjoxNjUwNjI3NDUxLCJleHAiOjE2NTEyMzIyNTEsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.LOEx1gC6aYjiZo-Di1dFRgEgkytqtS7DjxQi0aeT6fs'
                    }
                });
            console.log(response.data);
            navigate("../connexion", { replace: true })
        } catch (err) {
            console.log(err.response.data.data);
            if (!err?.response) {
                setErrMsg('Le serveur ne répond pas');
            } else if (err.response?.data.data.errorCode === 38) {
                setErrMsg('Nom d\'utilisateur ou email déjà pris');
            } else {
                setErrMsg('Échec de l\'enregistrement');
            }
            errRef.current.focus();
        } 
    }

    return(
        <section className="register">
            <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>

                {/* Username */}
                <label htmlFor="username">
                    Nom d'utilisateur :
                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 à 24 caractères.<br />
                    Doit commencer par une lettre.<br />
                    Lettre, nombre, underscore et trait d'union autorités.
                </p>

                {/* Password */}
                <label htmlFor="password">
                    Mot de passe :
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 à 24 caractères.<br />
                    Doit inclure une majuscule, une minuscule, un chiffre et un caractère spécial.<br />
                    Caractères autorités : <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>

                {/* Confirm Password */}
                <label htmlFor="confirm_pwd">
                    Confirmation :
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Vos deux mots de passes doivent correspondre.
                </p>

                {/* Email */}
                <label htmlFor="email">
                    Adresse email :
                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Lettre, nombre, underscore et trait d'union autorités.
                </p>

                <div className="checkbox">
                    <input 
                        type="checkbox"
                        id="eleve"
                        ref={eleveRef}
                        onChange={() => handleCheckbox('subscriber')}
                    />
                    <label htmlFor="eleve">Élève</label>

                    <input 
                        type="checkbox"
                        id="prof"
                        ref={profRef}
                        onChange={() => handleCheckbox('editor')}
                    />
                    <label htmlFor="prof">Professeur</label>
                </div>

                <button className="form-btn" disabled={!validName || !validPwd || !validMatch || !validEmail || role === '' ? true : false}>S'enregistrer</button>

                <p>
                    Déjà enregistré ?<br />
                    <span className="line">
                        <Link to="../connexion">Se connecter</Link>
                    </span>
                </p>
            </form>
        </section>
    )
};

export default Register;