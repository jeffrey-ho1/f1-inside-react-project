import axios from 'axios'

const apiKey = import.meta.env.VITE_FONEINSIDE_API_KEY;
// Stap 1: Asynchrone functie om een nieuwe gebruiker te registreren.
// Stap 2: Haal benodigde data uit userData object.
// Stap 3: Verstuur een POST-request naar de /users endpoint met de gebruikersdata.
// Stap 4: Geef de data van de server-response terug.
export async function registerUser(userData) {
    const { username, email, password } = userData;
    const response = await axios.post('https://api.datavortex.nl/foneinside/users',{
        username,
        email,
        password,
        roles: ["USER"]
    }, {
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': apiKey
        }
    });
    return response.data;
}

// Stap 1: Exporteer asynchrone functie om een gebruiker in te loggen.
// Stap 2: Haal data uit het credentials object.
// Stap 3: Verstuur POST-request naar /users/authenticate endpoint met de inloggegevens.
// Stap 4: De server stuurt een object met een 'jwt' (token) terug.
export async function loginUser(credentials) {
    const { username, password } = credentials;
    const response = await axios.post('https://api.datavortex.nl/foneinside/users/authenticate', {
        username,
        password
    },{
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': apiKey
        }
    });
    return response.data;
}