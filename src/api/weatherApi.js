import axios from 'axios';
import { WEATHER_API_BASE_URL } from '../constants/apiConstants';

//Stap 1: Haal de API-sleutel op uit de environment variables.
//Stap 2: Een array om de circuitnaam van de F1 API om te zetten naar een stadsnaam volgens WeatherAPI data
//Stap 3: Exporteer functie die het actuele weer voor een specifiek circuit ophaalt.
//stap 4: Controleer of de sleutel aanwezig is.
//stap 5: Zoek de bijbehorende stad op in de array.
//Stap 6: Als de stad niet gevonden wordt, geef een duidelijke foutmelding.
//Stap 7: Verstuur een GET-request naar de WeatherAPI.
//Stap 8: Geef de volledige data response terug.
//Stap 9: Vang fouten af en log de specifieke foutmelding van de WeatherAPI.

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const circuitToCityMap = {
    'Silverstone': 'Silverstone',
    'Spa-Francorchamps': 'Francorchamps',
    'Zandvoort': 'Zandvoort',
    'Monza': 'Monza'
};
export async function getWeatherForCircuit(circuitShortName) {
    if (!WEATHER_API_KEY) throw new Error("WeatherAPI.com sleutel niet gevonden.");
    const city = circuitToCityMap[circuitShortName];
    if (!city) throw new Error(`Geen stad gevonden voor circuit: ${circuitShortName}`);

    try {
        const response = await axios.get(WEATHER_API_BASE_URL, {
            params: {
                key: WEATHER_API_KEY,
                q: city,
                lang: 'nl'
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Fout bij weer API:", error.response?.data?.error?.message || error.message);
        throw error;
    }
}



