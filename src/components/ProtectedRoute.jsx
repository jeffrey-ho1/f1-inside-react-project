import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {

    const {isAuthenticated, isLoading} = useAuth();
    if (isLoading) {
        return <p>Aan het laden...</p>;
    }
    if (!isAuthenticated) {

        return <Navigate to="/login" replace/>;
    }
    return children;
    }
export default ProtectedRoute;