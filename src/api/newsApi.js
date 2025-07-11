import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = 'https://newsapi.org/v2/everything';

export async function getF1News() {
    try {
        const response = await axios.get(API_URL, {
            params: { apiKey: API_KEY, q: 'Formula 1', language: 'nl', pageSize: 3, sortBy: 'publishedAt' }
        });
        return response.data.articles;
    } catch (error) {
        console.error("Fout bij ophalen nieuws:", error);
        throw error;
    }
}