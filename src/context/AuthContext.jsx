import React, {createContext, useState, useContext, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginUser as loginUserApi } from '../api/authApi';

export const AuthContext = createContext(null);

// Stap 1: Provider'-component. Deze component zal de hele app omvatten
// en de state en functies beschikbaar maken voor alle "children".
// Stap 2: State voor de gebruikersinformatie (standaard 'null', niemand is ingelogd).
// Stap 3: State voor het JWT-token. We lezen de initiële waarde direct uit de browser's localStorage.
// Stap 4: State voor de favorieten van de gebruiker, ook uit localStorage gehaald.
// Stap 5: Controleer of er al favorieten zijn opgeslagen.
// Stap 6: Als er data is, parse deze van JSON-string naar een object. Anders, start met een lege structuur.
// stap 7: State om bij te houden of de initiële authenticatie-check nog bezig is.
// stap 8: Haal de navigate-functie op van de router.

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : { drivers: [], teams: [] };
    });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

// Stap 1: useEffect die runt wanneer het token verandert (bij inloggen, uitloggen, of pageload).
// Satp 2: Als er een token is in localStorage, decodeer de token om de data te kunnen lezen.
// Satp 3: Controleer of de token nog niet verlopen is.
// Stap 4: Stel de gebruiker in op basis van de subject uit de token, dit is de gebruikersnaam.
// Stap 5: Als er iets misgaat met de token (ongeldig of verlopen), log de gebruiker uit.
// Stap 6: Geef aan dat de check klaar is, zodat de rest van de app kan renderen.

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    logout();
                }
                setUser({ username: decodedToken.sub });
            } catch (e) {
                console.error("Token ongeldig, uitloggen.", e);
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            }
        }
        setIsLoading(false);
    }, [logout,token]);

// Stap 1: useEffect die runt wanneer de favorietenlijst verandert.
// Stap 2: Als er een gebruiker is, sla de favorieten op in localStorage.
// Satp 3: We maken de key uniek per gebruiker.

    useEffect(() => {
        if (user) {
            localStorage.setItem(`favorites_${user.username}`, JSON.stringify(favorites));
        }
    }, [favorites, user]);

// Stap 1: Functie om in te loggen.
// Stap 2: Roep de API aan om de JWT op te halen.
// Stap 3: Sla de token op in localStorage.
// Stap 4: Update de token.
// Stap 5: Stuur de gebruiker door naar de nieuwspagina.

    const login = async (credentials) => {
        const { jwt } = await loginUserApi(credentials);
        localStorage.setItem('token', jwt);
        setToken(jwt);
        navigate('/nieuws');
    };

// Stap 1: Functie om uit te loggen.
// Stap 2: Verwijder de token uit localStorage.
// Stap 3: Reset ook de favorietenlijst.
// Stap 4: Stuur de gebruiker terug naar de homepage.


    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setFavorites([]);
        navigate('/');
        }, [navigate]);

// Stap1: Functies om favorieten te beheren.
// Stap2: De 'value' die we via de Context Provider beschikbaar stellen aan de hele app.

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

export function useAuth() { return useContext(AuthContext); }