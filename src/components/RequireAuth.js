import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log('Auth actuel', auth);
    return(
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/interdit" state={{ from: location }} replace />
                : <Navigate to="/connexion" state={{ from: location }} replace />
    );
}

export default RequireAuth;