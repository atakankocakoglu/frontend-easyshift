import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const userId = sessionStorage.getItem('userId');

    return userId ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
