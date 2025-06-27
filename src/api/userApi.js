import axios from 'axios';
import { NOVI_API_BASE_URL } from '../constants/apiConstants';

// Herbruikbare functie voor autorisatie header
const getAuthConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

// Functie om gebruikersdata op te halen.
export async function getUserData(token) {
    // GET-request naar de /users/me endpoint, en voeg de autorisatie-header toe.
    const response = await axios.get(`${NOVI_API_BASE_URL}/users/me`, getAuthConfig(token));
    return response.data;
}

// Functie om gebruikersdata (zoals favorieten) bij te werken.
export async function updateUserData(token, data) {
    // PUT-request om de 'info'-data van de gebruiker te overschrijven.
    const response = await axios.put(`${NOVI_API_BASE_URL}/users/me`, { info: data }, getAuthConfig(token));
    return response.data;
}