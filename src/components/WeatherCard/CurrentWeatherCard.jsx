import React from 'react';
import styles from './CurrentWeatherCard.module.css';
import Sun from '../../assets/Sun.png';
import Humidity from '../../assets/Humidity.png';
import Wind from '../../assets/Wind.png';
import Sunrise from '../../assets/Sunrise.png';
import Sunset from '../../assets/Sunset.png';

function CurrentWeatherCard({ data }) {

    if (!data) {
        return null;
    }

    return (
        <div className={'baseCard ${styles.card}'}>

            <p className={styles.header}>Actueel weer {data.location}</p>

            <div className={styles.mainInfo}>
                <img src={Sun} alt={data.condition} className={styles.weatherIcon} />
                <div className={styles.tempSection}>
                    <span className={styles.temperature}>{Math.round(data.air_temperature)}°C</span>
                    <span className={styles.condition}>{data.condition}</span>
                </div>
            </div>

            <div className={styles.details}>
                <div className={styles.detailItem}>
                    <img src={Humidity} alt="Luchtvochtigheid" />
                    <span>{data.humidity}%</span>
                    <p>Luchtvochtigheid</p>
                </div>
                <div className={styles.detailItem}>
                    <img src={Wind} alt="Windsnelheid" />
                    <span>{Math.round(data.wind_speed)} km/h</span>
                    <p>Wind</p>
                </div>
            </div>

            <div className={styles.extraDetails}>
                <div className={styles.sunTimes}>
                    <span><img src={Sunrise} alt="Zonsopkomst"/> {data.sunrise}</span>
                    <span><img src={Sunset} alt="Zonsondergang"/> {data.sunset}</span>
                </div>
                <div className={styles.trackTemp}>
                    Baantemperatuur: <strong>{Math.round(data.track_temperature)}°C</strong>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeatherCard;