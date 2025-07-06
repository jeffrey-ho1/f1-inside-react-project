import React from 'react';
import styles from './NextRaceCard.module.css'; // Zorg dat het CSS-bestand ook bestaat
import circuitImage from '../../assets/MonacoCircuit.png';


function NextRaceCard() {
    return (
        <div className={styles.raceWidget}>
            <h4>VOLGENDE RACE</h4>
            <img src={circuitImage} alt="Circuit van Monaco" className={styles.circuitImage} />
            <div className={styles.raceInfo}>
                <h5>MONACO GRAND PRIX</h5>
                <span>26 - 28 MEI</span>
                <div className={styles.countdown}>OVER 3 DAGEN</div>
            </div>
        </div>
    );
}

export default NextRaceCard;
