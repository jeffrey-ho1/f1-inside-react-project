import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginUser as loginUserApi } from '../api/authApi';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : { drivers: [], teams: [] };
    });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setFavorites({ drivers: [], teams: [] });
        navigate('/');
    }, [navigate]);

    const login = async (credentials) => {
        try {
            const { jwt } = await loginUserApi(credentials);
            localStorage.setItem('token', jwt);
            setToken(jwt);
            const decodedToken = jwtDecode(jwt);
            setUser({ username: decodedToken.sub });
            navigate('/nieuws');
        } catch (error) {
            console.error("Inloggen mislukt:", error);
        }
    };


    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    console.log("Token is verlopen, gebruiker wordt uitgelogd.");
                    logout();
                } else {
                    setUser({ username: decodedToken.sub });
                }
            } catch (e) {
                console.error("Token ongeldig, gebruiker wordt uitgelogd.", e);
                logout();
            }
        }
        setIsLoading(false);
    }, [token, logout]);


    useEffect(() => {
        if (user && user.username) {
            localStorage.setItem(`favorites_${user.username}`, JSON.stringify(favorites));
        }
    }, [favorites, user]);


    const addFavorite = (item) => { setFavorites(prev => [...prev, item]); };
    const removeFavorite = (itemId) => { setFavorites(prev => prev.filter(i => i.id !== itemId)); };
    const isFavorite = (itemId) => favorites.some(fav => fav.id === itemId);

    const value = { user, isAuthenticated: !!user, favorites, isLoading, login, logout, addFavorite, removeFavorite, isFavorite };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
