import React, {useState, useEffect, useCallback} from 'react';
import styles from './WeatherPage.module.css';
import { fetchMeetings } from '../../api/openf1Api';
import RaceSelector from '../../components/RaceSelector/RaceSelector';
import { getWeatherForCircuit } from '../../api/weatherApi';
import CurrentWeatherCard from '../../components/WeatherCard/CurrentWeatherCard';
import TimeCard from '../../components/TimeCard/TimeCard';
import ForecastCard from '../../components/WeatherCard/ForecastCard';

function WeatherPage() {
    const [circuits, setCircuits] = useState([]);
    const [selectedCircuitId, setSelectedCircuitId] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [loadingCircuits, setLoadingCircuits] = useState(true);
    const [loadingWeather, setLoadingWeather] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCircuitList = async () => {
            try {
                const meetingsData = await fetchMeetings();
                const uniqueCircuitsMap = new Map();
                /**
                 * @param {object} meeting - Een meeting-object van de OpenF1 API.
                 * @param {number} meeting.circuit_key - De unieke ID van het circuit.
                 * @param {string} meeting.location - De locatie van de meeting.
                 * @param {string} [meeting.circuit_short_name] - De (optionele) korte naam.
                 */
                meetingsData.forEach(meeting => {
                    if (meeting && meeting.circuit_key && !uniqueCircuitsMap.has(meeting.circuit_key)) {
                        uniqueCircuitsMap.set(meeting.circuit_key, {
                                id: meeting.circuit_key,
                                name: meeting.location,
                                shortName: meeting.circuit_short_name || meeting.location
                            });
                        }

                });

                const uniqueCircuits = Array.from(uniqueCircuitsMap.values())
                    .sort((a, b) => a.name.localeCompare(b.name));
                setCircuits(uniqueCircuits);
                if (uniqueCircuits.length > 0) {
                    setSelectedCircuitId(uniqueCircuits[0].id);
                }
            } catch (error) {
                console.error("Kon de circuitlijst niet laden.", error);
                setError("De lijst met circuits kon niet worden geladen.");
            } finally {
                setLoadingCircuits(false);
            }
        };
        void getCircuitList();

    },[]);



        useEffect(() => {
                if (!selectedCircuitId || circuits.length === 0) return;
                const getWeatherData = async () => {
                    try {
                        setLoadingWeather(true);
                        setError(null);
                        const currentCircuit = circuits.find(c => c.id === Number(selectedCircuitId));
                        if (!currentCircuit) return;

                        const weatherApiResponse = await getWeatherForCircuit(currentCircuit.shortName);

                        let formattedWeatherData = null;
                        let formattedForecast = [];

                        if (weatherApiResponse?.current && weatherApiResponse?.location) {

                            const {temp_c, condition, humidity, wind_kph} = weatherApiResponse.current;
                            const {name, localtime, tz_id} = weatherApiResponse.location;
                            const astroData = weatherApiResponse.forecast?.forecastday?.[0]?.astro;

                            formattedWeatherData = {
                                location: currentCircuit.name,
                                localtime: localtime,
                                timeZone: tz_id,
                                air_temperature: temp_c,
                                condition: condition?.text,
                                humidity: humidity,
                                wind_speed: wind_kph,
                                track_temperature: (temp_c ?? 0) + 5,
                                sunrise: astroData?.sunrise ?? 'N/A',
                                sunset: astroData?.sunset ?? 'N/A'
                            };
                        }

                        formattedForecast = weatherApiResponse.forecast?.forecastday?.slice(1).map(day => ({
                            date: day?.date ?? '',
                            high: day?.day?.maxtemp_c ?? 0,
                            low: day?.day?.mintemp_c ?? 0,
                            condition: day?.day?.condition?.text ?? 'Geen data'
                        })) ?? [];

                        setWeatherData(formattedWeatherData);
                        setForecastData(formattedForecast);
                    } catch (e) {
                        console.error("Kon weerdata niet ophalen.", e);
                        setError("Kon de weerdata voor dit circuit niet ophalen.");
                    } finally {
                        setLoadingWeather(false);
                    }
                };
                void getWeatherData();
            },
            [selectedCircuitId, circuits]);

    return (
        <main className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Weer per Circuit</h1>

            {loadingCircuits ? <p>Circuitlijst wordt geladen...</p> : (
                <RaceSelector
                    circuits={circuits}
                    selectedCircuit={selectedCircuitId}
                    onCircuitChange={setSelectedCircuitId}
                />
                )}

            {loadingWeather && <p>Actuele weerdata wordt geladen...</p>}

            {error && <p className={styles.errorMessage}>{error}</p>}

            {!loadingCircuits && !loadingWeather && !error && weatherData && (
                <>
                    <div className={styles.topGrid}>
                        <CurrentWeatherCard data={weatherData} />
                        <TimeCard location={weatherData.location}
                                  timeZone={weatherData.timeZone}
                        />
                    </div>
                    <h2 className={styles.sectionTitle}>Weersvoorspelling komende dagen</h2>
                    <div className={styles.forecastGrid}>
                        {forecastData.map(day => (
                            <ForecastCard key={day.date} forecast={day} />
                        ))}
                    </div>
                </>
            )}
        </main>
    );
}

export default WeatherPage;