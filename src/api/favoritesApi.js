import axios from 'axios';

// Dit is de basis-URL van de server die je docent heeft gegeven.
const API_BASE_URL = 'https://api.datavortex.nl/foneinside';

// Functie om alle coureurs op te halen van de echte server
export const getAllDrivers = async (token) => {
    try {
        // We doen een GET-request naar het /drivers eindpunt
        const response = await axios.get(`${API_BASE_URL}/drivers`,{
        headers: {
            "Content-Type": "application/json",
                // Voeg de Authorization header toe met het token
                "Authorization": `Bearer ${token}`,
        }
    });

        // We geven de lijst met coureurs terug die in response.data zit
        return response.data;
    } catch (error) {
        console.error("Fout bij het ophalen van de coureurs:", error);
        // Geef een lege lijst terug als er een fout optreedt
        return [];
    }
};

// Functie om alle teams op te halen van de echte server
export const getAllTeams = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/teams`,{
            headers: {
                "Content-Type": "application/json",
                // Voeg de Authorization header toe met het token
                "Authorization": `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Fout bij het ophalen van de teams:", error);
        return [];
    }
};
