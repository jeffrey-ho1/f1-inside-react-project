import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BreakingNewsCard.module.css';

function BreakingNewsCard({ article }) {
    if (!article) {
        return null;
    }

    return (
        <Link to={`/nieuws/${article.id}`} className={styles.breakingCard}>
            <img src={article.image} alt={article.title} className={styles.cardImage} />
            <div className={styles.label}>BREAKING NEWS</div>
            <div className={styles.content}>
                <h3>{article.title}</h3>
                <p>{article.subtitle}</p>
            </div>
        </Link>
    );
}

export default BreakingNewsCard;