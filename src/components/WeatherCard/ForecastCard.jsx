import React from 'react';
import styles from './ForecastCard.module.css';
import SunIcon from '../../assets/Sun-1.png';

function ForecastCard({ forecast }) {
    if (!forecast) return null;

    const day = new Date(forecast.date).toLocaleDateString('nl-NL', { weekday: 'long' });
    const date = new Date(forecast.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' });

    return (
        <div className={'baseCard ${styles.card}'}>
            <h3>{day}, {date}</h3>
            <div className={styles.forecastInfo}>
                <img src={SunIcon} alt={forecast.condition} className={styles.weatherIcon} />
                <span className={styles.temps}>{forecast.high}°C | {forecast.low}°C</span>
            </div>
        </div>
    );
}

export default ForecastCard;