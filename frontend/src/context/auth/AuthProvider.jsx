import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import * as userService from "../../services/user.service";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // Load user on app start
    useEffect(() => {
        const init = async () => {
            try {
                const { data } = await userService.getMe();
                setUser(data.user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);


    // Login
    const login = async (data) => {
        const res = await userService.loginUser(data);

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        setUser(res.data.user);
    };


    // Register
    const register = async (data) => {
        const res = await userService.registerUser(data);

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        setUser(res.data.user);
    };


    // Logout
    const logout = async () => {
        await userService.logoutUser();

        localStorage.clear();
        setUser(null);
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};