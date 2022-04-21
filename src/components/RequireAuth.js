import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log('Auth actuel', auth);

    return(
        auth?.user
            ? <Outlet />
            : <Navigate to="/connexion" state={{ from: location }} replace />
    );
}

export default RequireAuth;