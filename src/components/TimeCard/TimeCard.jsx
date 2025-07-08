import React, { useState, useEffect } from 'react';
import styles from './TimeCard.module.css';


function TimeCard({ location, timeZone }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(intervalId);
    }, []);

    const today = new Intl.DateTimeFormat('nl-NL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        timeZone: timeZone || 'Europe/Amsterdam' // fallback
    }).format(time);

    const currentTime = new Intl.DateTimeFormat('nl-NL', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timeZone || 'Europe/Amsterdam'
    }).format(time);

    return (
        <div className={`baseCard ${styles.card}`}>
            <p className={styles.localTimeText}>Lokale tijd</p>
        <h2 className={styles.location}>{location || 'Locatie'}</h2>
            <div className={styles.time}>{currentTime}</div>
            <div className={styles.date}>{today}</div>
        </div>
    );
}
export default TimeCard;