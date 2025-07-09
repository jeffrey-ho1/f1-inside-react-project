import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Card.module.css';

function DriverCard({ driver }) {
    const { removeFavorite } = useAuth();
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h4>{driver.name}</h4>
                <p>{driver.team}</p>
            </div>
            <button onClick={() => removeFavorite(driver.id)} className={styles.removeButton}>×</button>
        </div>
    );
}
export default DriverCard;
