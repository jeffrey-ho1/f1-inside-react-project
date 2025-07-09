import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from '../DriverCard/Card.module.css';

function TeamCard({ team }) {
    const { removeFavorite } = useAuth();
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h4>{team.name}</h4>
                <p>{team.points} punten</p>
            </div>
            <button onClick={() => removeFavorite(team.id)} className={styles.removeButton}>×</button>
        </div>
    );
}
export default TeamCard;