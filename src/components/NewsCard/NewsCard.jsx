import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NewsCard.module.css';

export default function NewsCard({ article }) {
    return (
        <article className={styles.card}>
            <img src={article.image} alt={article.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{article.title}</h3>
                <p className={styles.cardExcerpt}>{article.subtitle}</p>
                <Link to={`/news/${article.id}`} className={styles.readMore}>
                    Lees meer
                </Link>
            </div>
        </article>
    );
}