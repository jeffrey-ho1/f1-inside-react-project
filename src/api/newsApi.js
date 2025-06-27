import axios from "axios";
import { NEWS_API_BASE_URL } from "../constants/apiConstants";

// Haal de API-sleutel op uit de .env
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

let response;
response.data.articles = undefined;

export async function getF1News() {
    // Controleer of de sleutel aanwezig is, anders geef een duidelijke foutmelding.
    if (!NEWS_API_KEY) throw new Error("NewsAPI sleutel niet gevonden.");

    // Verstuur een GET-request naar de NewsAPI.
    // Het 'params' object voegt de parameters toe aan de URL
    try {
        const response = await axios.get(NEWS_API_BASE_URL, {
            params: {
                q: 'Formula 1',
                sortBy: 'publishedAt',
                language: 'nl',
                apiKey: NEWS_API_KEY
            }
        });
        // Geef de lijst met artikelen terug die in de 'articles' property zit
        return response.data.articles;
    } catch (error) {
        // Vang fouten af en log de foutmelding van de server.
        console.error("Fout bij nieuws API:", error.response?.data?.message || error.message);
        throw error;
    }
}

