import React from 'react';
import styles from './NewsGrid.module.css';

function NewsGrid() {
    return (
        <div className={styles.container}>
            <h2>Laatste Nieuws</h2>
            <p>Nieuws wordt geladen...</p>
            {/* Hier komt later de grid met de daadwerkelijke nieuwskaarten */}
        </div>
    );
}

export default NewsGrid;