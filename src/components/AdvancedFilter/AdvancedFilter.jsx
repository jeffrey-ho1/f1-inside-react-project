import React from 'react';
import styles from './AdvancedFilter.module.css';

function AdvancedFilter({ teams, nationalities, onFilterChange }) {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    return (
        <div className={styles.filterContainer}>
            <div className={styles.filterGroup}>
                <label htmlFor="team-filter">Team:</label>
                <select name="team" id="team-filter" onChange={handleFilterChange}>
                    <option value="">Alle</option>
                    {teams.map(team => <option key={team.id} value={team.name}>{team.name}</option>)}
                </select>
            </div>
            <div className={styles.filterGroup}>
                <label htmlFor="nationality-filter">Nationaliteit:</label>
                <select name="nationality" id="nationality-filter" onChange={handleFilterChange}>
                    <option value="">Alle</option>
                    {nationalities.map(nat => <option key={nat} value={nat}>{nat}</option>)}
                </select>
            </div>
        </div>
    );
}

export default AdvancedFilter;
