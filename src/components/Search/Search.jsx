import React, { useState, useEffect, useRef } from 'react';
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
                console.log(`TEST: Zoeken naar "${query}" na een pauze...`);
                const results = await searchAll(query);
                setSuggestions(results);
            } else {
                setSuggestions([]);
            }
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsActive(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.searchContainer} ref={searchRef}>
            <div className={styles.searchWrapper}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsActive(true)}
                    placeholder="Zoeken..."
                    className={styles.searchInput}
                />
            </div>
            {isActive && query && (
                <ul className={styles.suggestionsList}>
                    {suggestions.length > 0 ? (
                        suggestions.map((item) => (
                            <li key={item.id} className={styles.suggestionItem}>
                                <span className={styles.suggestionType}>{item.type}</span>
                                {item.title}
                            </li>
                        ))
                    ) : (
                        <li className={styles.noResults}>Geen resultaten</li>
                    )}
                </ul>
            )}
        </div>
    );
}
export default Search;
