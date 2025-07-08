import axios from 'axios';
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

//Stap 1: Haal de API-sleutel op uit de environment variables.
//Stap 2: Een array om de circuitnaam van de F1 API om te zetten naar een stadsnaam volgens WeatherAPI data
//Stap 3: Exporteer functie die het actuele weer voor een specifiek circuit ophaalt.
//stap 4: Controleer of de sleutel aanwezig is.
//stap 5: Zoek de bijbehorende stad op in de array.
//Stap 6: Als de stad niet gevonden wordt, geef een duidelijke foutmelding.
//Stap 7: Verstuur een GET-request naar de WeatherAPI.
//Stap 8: Geef de volledige data response terug.
//Stap 9: Vang fouten af en log de specifieke foutmelding van de WeatherAPI.

export async function getWeatherForCircuit(circuitShortName) {
const circuitDetails = {
    'Silverstone': { coords: '52.0786,-1.0169' },
    'Spa-Francorchamps': { coords: '50.4372,5.9713' },
    'Zandvoort': { coords: '52.3888,4.5409' },
    'Monza': { coords: '45.6156,9.2811' },
    'Monte-Carlo': { coords: '43.7347,7.4206' },
    'Imola': { coords: '44.3439,11.7136' },
    'Catalunya': { coords: '41.5700,2.2611' },
    'Spielberg': { coords: '47.2197,14.7647' },
    'Hungaroring': { coords: '47.5789,19.2486' },
    'Sakhir': { coords: '26.0325,50.5104' },
    'Jeddah': { coords: '21.6332,39.1043' },
    'Baku': { coords: '40.3725,49.8533' },
    'Suzuka': { coords: '34.8431,136.5411' },
    'Shanghai': { coords: '31.3389,121.2208' },
    'Marina Bay': { coords: '1.2914,103.8636' },
    'Lusail': { coords: '25.4900,51.4542' },
    'Yas Marina': { coords: '24.4672,54.6031' },
    'Austin': { coords: '30.1328,-97.6411' },
    'Miami': { coords: '25.9581,-80.2389' },
    'Montreal': { coords: '45.5000,-73.5222' },
    'Mexico City': { coords: '19.4042,-99.0907' },
    'Interlagos': { coords: '-23.7036,-46.6997' },
    'Las Vegas': { coords: '36.1147,-115.1728' },
    'Melbourne': { coords: '-37.8497,144.9683' }
};

    if (!WEATHER_API_KEY) throw new Error("WeatherAPI.com sleutel niet gevonden.");

    const details = circuitDetails[circuitShortName];
    if (!details) throw new Error(`Geen stad gevonden voor circuit: ${circuitShortName}`);

    const API_URL = 'https://api.weatherapi.com/v1/forecast.json';

    try {
        const response = await axios.get(API_URL, {
            params: {
                key: WEATHER_API_KEY,
                q: details.coords,
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



