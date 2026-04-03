import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import Loader from "../shared/Loader";

const AuthGuard = () => {
    const { user, loading } = useAuth();

    // While checking auth
    if (loading) {
        return <Loader fullScreen />;
    }

    // If already logged in → redirect
    if (user) {
        return <Navigate to="/" replace />;
    }

    // Allow access
    return <Outlet />;
};

export default AuthGuard;