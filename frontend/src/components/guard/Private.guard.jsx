import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import Loader from "../shared/Loader";

const PrivateGuard = () => {
    const { user, loading } = useAuth();

    // While checking auth
    if (loading) {
        return <Loader fullScreen />;
    }

    // Not logged in → redirect
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Allow access
    return <Outlet />;
};

export default PrivateGuard;