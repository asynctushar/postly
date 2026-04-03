import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setupResponseInterceptor } from "../lib/axios";
import { useAuth } from "../context/auth/useAuth";

const useAxiosInterceptors = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        const eject = setupResponseInterceptor(navigate, setUser);
        return eject; // cleanup on unmount
    }, [navigate, setUser]);
};

export default useAxiosInterceptors;