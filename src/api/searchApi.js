import axios from 'axios';

const OPENF1_API_URL = 'https://api.openf1.org/v1';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

    const getDriversFromOpenF1 = async () => {
        try {
            const response = await axios.get(`${OPENF1_API_URL}/drivers?session_key=latest`);
            console.log("DEBUG (OpenF1): Ruwe driver data ontvangen:", response.data);

            const drivers = response.data.map(driver => ({
                id: driver.driver_number,
                name: driver.full_name,
                type: 'Coureur',
                url: `/coureurs/${driver.driver_number}`
            }));

            const uniqueDrivers = [...new Map(drivers.map(item => [item['id'], item])).values()];

            return uniqueDrivers;
        } catch (error) {
            console.error("FOUT bij ophalen coureurs van OpenF1:", error);
            return [];
        }
    };

    const getNewsFromNewsApi = async (query) => {
        try {
            const response = await axios.get(NEWS_API_URL, {
                params: { q: `formula 1 ${query}`, sortBy: 'relevancy', apiKey: NEWS_API_KEY }
            });

            return response.data.articles.map(article => ({
                id: `news-${article.source.id}-${new Date(article.publishedAt).getTime()}`,
                title: article.title,
                type: 'Nieuws',
                url: article.url
            }));
        } catch (error) {
            console.error("Fout bij ophalen nieuws van NewsAPI:", error);
            return [];
    }
};

export const searchAll = async (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const [drivers, news] = await Promise.all([
        getDriversFromOpenF1(),
        getNewsFromNewsApi(query)
    ]);


    const driverResults = drivers.filter(driver =>
        driver.name.toLowerCase().includes(lowerCaseQuery)
    );

    const newsResults = news;


    console.log("DEBUG (Resultaat): Gevonden coureurs:", driverResults);
    console.log("DEBUG (Resultaat): Gevonden nieuws:", newsResults);

    return [...driverResults, ...newsResults];
};