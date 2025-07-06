import React from 'react';
import styles from './NewsGrid.module.css';
import BreakingNewsCard from './BreakingNewsCard/BreakingNewsCard.jsx';
import NewsCard from './NewsCard/NewsCard.jsx';
import NextRaceCard from './NextRaceCard/NextRaceCard.jsx';


function NewsGrid({ articles }) {
    const mainArticleData = articles.length > 0 ? articles[0] : null;
    const smallArticlesData = articles.length > 1 ? articles.slice(1, 3) : [];

    return (
        <div className={styles.gridContainer}>
            <div className={styles.mainArticleArea}>
                <BreakingNewsCard article={mainArticleData} />
            </div>

            <div className={styles.raceWidgetArea}>
                <NextRaceCard />
            </div>

            {smallArticlesData.map((article, index) => (
                <div key={article.id} className={styles[`smallArticle${index + 1}Area`]}>
                    <NewsCard article={article} />
                </div>
            ))}
        </div>
    );
}

export default NewsGrid;
