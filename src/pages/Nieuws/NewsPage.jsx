import React, { useState, useEffect } from 'react';
import styles from './NewsPage.module.css';
import { getF1News } from '../../api/newsApi';
import NewsGrid from '../../components/NewsGrid.jsx'; // Let op het pad

function NewsPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchNews() {
            try {
                const newsData = await getF1News();
                const formattedArticles = newsData.map(article => ({
                    id: article.url,
                    title: article.title,
                    subtitle: article.description,
                    image: article.urlToImage || 'https://placehold.co/600x400?text=Geen+Afbeelding',
                    timestamp: new Date(article.publishedAt).toLocaleDateString('nl-NL'),
                }));
                setArticles(formattedArticles);
            } catch (e) {
                setError("Nieuws kon niet worden geladen.");
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, []);

    return (
        <div className={styles.pageContainer}>
            <h1>Nieuws</h1>
            {loading && <p>Nieuws wordt geladen...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && <NewsGrid articles={articles} />}
        </div>
    );
}

export default NewsPage;
