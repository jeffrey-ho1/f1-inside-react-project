import axios from 'axios';
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeatherForCircuit(location) {
    if (!WEATHER_API_KEY) {
        throw new Error("WeatherAPI.com sleutel niet gevonden.");
    }
    if (!location) {
        throw new Error("Geen locatie opgegeven om weer op te halen.");
    }

    const API_URL = 'https://api.weatherapi.com/v1/forecast.json';

    try {
        const response = await axios.get(API_URL, {
            params: {
                key: WEATHER_API_KEY,
                q: location,
                lang: 'nl',
                days: 4
            }
        });
        return response.data;
    }
    catch (error) {

        console.error("Fout bij weer API:", error.response?.data?.error?.message || error.message);
        throw error;
    }
}