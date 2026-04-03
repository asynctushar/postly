import React from 'react';
import { Outlet } from 'react-router-dom';

const PrivateGuard = () => {
    return (
        <Outlet />
    );
};

export default PrivateGuard;