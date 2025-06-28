import axios from 'axios';
import { NOVI_API_BASE_URL } from '../constants/apiConstants';

// Stap 1: Asynchrone functie om een nieuwe gebruiker te registreren.
// Stap 2: Haal benodigde data uit userData object.
// Stap 3: Verstuur een POST-request naar de /users endpoint met de gebruikersdata.
// Stap 4: Geef de data van de server-response terug.
export async function registerUser(userData) {
    const { username, email, password } = userData;
    const response = await axios.post(`${NOVI_API_BASE_URL}/users`, { username, email, password, roles: ["USER"] });
    return response.data;
}

// Stap 1: Exporteer asynchrone functie om een gebruiker in te loggen.
// Stap 2: Haal data uit het credentials object.
// Stap 3: Verstuur POST-request naar /users/authenticate endpoint met de inloggegevens.
// Stap 4: De server stuurt een object met een 'jwt' (token) terug.
export async function loginUser(credentials) {
    const { username, password } = credentials;
    const response = await axios.post(`${NOVI_API_BASE_URL}/users/authenticate`, { username, password });
    return response.data;
}