import React from 'react';
import { Outlet } from "react-router-dom";

const AuthGuard = () => {
    return (
        <Outlet />
    );
};

export default AuthGuard;