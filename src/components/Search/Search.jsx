import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Search.module.css';
import { searchAll } from '../../api/searchApi';

function Search() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const timerId = setTimeout(async () => {
            if (query) {
                const results = await searchAll(query);
                setSuggestions(results);
            } else {
                setSuggestions([]);
            }
        }, 500);
        return () => clearTimeout(timerId);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsActive(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSuggestionClick = () => {
        setIsActive(false);
        setQuery('');
    };

    const renderSuggestion = (item) => {
        const content = (
            <li className={styles.suggestionItem}>
                <span className={styles.suggestionType}>{item.type}</span>
                {item.title}
            </li>
        );

        if (item.type === 'Nieuws') {
            return (
                <a href={item.url} key={item.id} target="_blank" rel="noopener noreferrer" className={styles.suggestionLink} onClick={handleSuggestionClick}>
                    {content}
                </a>
            );
        }

        return (
            <Link to={item.url} key={item.id} className={styles.suggestionLink} onClick={handleSuggestionClick}>
                {content}
            </Link>
        );
    };

    return (
        <div className={styles.searchContainer} ref={searchRef}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {setIsActive(true)}}
                    placeholder= "Zoeken..."
                    className={styles.searchInput}
                />
            </div>
            {isActive && query && (
                <ul className={styles.suggestionsList}>
                    {suggestions.length > 0 ? (
                        suggestions.map(renderSuggestion)
                    ) : (
                        <li className={`${styles.suggestionItem} ${styles.noResults}`}>Geen resultaten</li>
                    )}
                </ul>
            )}
        </div>
    );
}
export default Search;
