import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h2>Accès non autorisé</h2>
            <p>Vous n'êtes pas autorisé à accéder à cette page.</p>
            <button className="form-btn" onClick={goBack}>Retourner à la page précédente</button>
        </section>
    )
}

export default Unauthorized;