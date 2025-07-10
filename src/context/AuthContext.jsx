import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginUser as loginUserApi } from '../api/authApi';
import { getUserData, updateUserData } from '../api/userDataApi';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [favorites, setFavorites] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setFavorites([]);
        navigate('/');
    }, [navigate]);

    const login = async (credentials) => {
        try {
            const { jwt } = await loginUserApi(credentials);
            localStorage.setItem('token', jwt);
            const decodedToken = jwtDecode(jwt);
            const username = decodedToken.sub;

            const userData = await getUserData(username, jwt);
            if (userData && userData.info) {
                setFavorites(JSON.parse(userData.info));
            }

            setUser({ username: username, email: userData.email });
            setToken(jwt);
            navigate('/profiel');
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
        const saveFavorites = async () => {
        if (user && token) {
            const favoritesString = JSON.stringify(favorites);
            await updateUserData(user.username, favoritesString, token);
        }
    };

    saveFavorites().catch(e => console.error("Fout bij opslaan favorieten:", e));
    }, [favorites, user, token]);

    const addFavorite = (item) => { setFavorites(prev => [...prev, item]); };
    const removeFavorite = (itemId) => { setFavorites(prev => prev.filter(i => i.id !== itemId)); };
    const isFavorite = (itemId) => favorites.some(fav => fav.id === itemId);

    const Value ={ user, isAuthenticated: !!user, favorites, isLoading, login,logout, addFavorite, removeFavorite, isFavorite };

    return (
        <AuthContext.Provider value={Value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
