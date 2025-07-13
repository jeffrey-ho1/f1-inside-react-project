import React, { useState, useEffect } from 'react';
import styles from './WeatherPage.module.css';
import { getNextRace } from '../../api/favoritesApi'; // Aangepaste import
import { getWeatherForCircuit } from '../../api/weatherApi';
import CurrentWeatherCard from '../../components/WeatherCard/CurrentWeatherCard';
import TimeCard from '../../components/TimeCard/TimeCard';
import ForecastCard from '../../components/WeatherCard/ForecastCard';

function WeatherPage() {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [nextRace, setNextRace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNextRaceWeather = async () => {
            try {
                setLoading(true);
                setError(null);


                const raceData = await getNextRace();
                if (!raceData) {
                    setError("Kon geen aanstaande race vinden.");
                    setLoading(false);
                    return;
                }
                setNextRace(raceData);


                const weatherApiResponse = await getWeatherForCircuit(raceData.circuit.city);
                if (!weatherApiResponse) {
                    setError("Kon de weerdata voor de volgende race niet ophalen.");
                    setLoading(false);
                    return;
                }


                const { current, location, forecast } = weatherApiResponse;
                setWeatherData({
                    location: raceData.circuit.circuitName,
                    localtime: location.localtime,
                    timeZone: location.tz_id,
                    air_temperature: current.temp_c,
                    condition: current.condition?.text,
                    humidity: current.humidity,
                    wind_speed: current.wind_kph,
                    track_temperature: (current.temp_c ?? 0) + 5,
                    sunrise: forecast?.forecastday?.[0]?.astro?.sunrise ?? 'N/A',
                    sunset: forecast?.forecastday?.[0]?.astro?.sunset ?? 'N/A'
                });

                setForecastData(forecast?.forecastday?.slice(1).map(day => ({
                    date: day.date,
                    high: day.day?.maxtemp_c,
                    low: day.day?.mintemp_c,
                    condition: day.day?.condition?.text
                })) ?? []);

            } catch (e) {
                setError("Kon de weersvoorspelling niet laden.");
            } finally {
                setLoading(false);
            }
        };

        void fetchNextRaceWeather();
    }, []);

    if (loading) return <p>Weersvoorspelling voor de volgende race wordt geladen...</p>;
    if (error) return <p className={styles.errorMessage}>{error}</p>;

    return (
        <main className={styles.pageContainer}>

            <h1 className={styles.pageTitle}>Weersvoorspelling: {nextRace?.raceName || "Volgende Race"}</h1>

            {weatherData && (
                <>
                    <div className={styles.topGrid}>
                        <CurrentWeatherCard data={weatherData} />
                        <TimeCard location={weatherData.location} timeZone={weatherData.timeZone} />
                    </div>
                    <h2 className={styles.sectionTitle}>Voorspelling komende dagen</h2>
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
