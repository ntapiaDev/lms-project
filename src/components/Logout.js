import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Logout = () => {
    const { setAuth } = useAuth();
    setAuth('');

    return(
        <Navigate to="/" replace />
    );
}

export default Logout;