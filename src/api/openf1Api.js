import axios from 'axios';
import { OPENF1_API_BASE_URL } from '../constants/apiConstants';


export async function fetchMeetings() {
        const response = await fetch('https://api.openf1.org/v1/meetings');
        if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`);
        }
        return await response.json();
    }


// stap 1: Exporteer een functie die de meest recente weerdata van een circuit ophaalt van OpenF1.
// stap 2: GET-request naar de /weather endpoint met de parameter session_key=latest.
// stap 3: Controleer of de response data bevat en of de lijst niet leeg is.
// stap 4: Geef het eerste (meest recente) weer-object terug.
// stap 5: Als er geen data is, geef dan null terug.
// stap 6: Vang eventuele fouten af en log de foutmelding van de server.
// stap 7: Gooi de fout door zodat de aanroepende component deze kan afhandelen.

export async function getTrackWeather() {
    try {
        const response = await axios.get(`${OPENF1_API_BASE_URL}/weather?session_key=latest`);
        if (response.data && response.data.length > 0) {
            return response.data[0];
        }
            return null;
        }       catch (error) {
            console.error("Fout bij ophalen van OpenF1 weer:", error.response?.data || error.message);
            throw error;
        }
}