import React, { useState, useEffect } from 'react';
import { getAllTeams } from '../../api/favoritesApi';
import styles from './TeamFilter.module.css';

function TeamFilter({ onFilterChange }) {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            const teamData = await getAllTeams();
            setTeams(teamData);
        };
        void fetchTeams();
    }, []);

    const handleChange = (e) => {
        const teamId = e.target.value;
        setSelectedTeam(teamId);
        onFilterChange(teamId);
    };

    return (
        <div className={styles.filterContainer}>
            <label htmlFor="team-filter">Filter op Team:</label>
            <select id="team-filter" value={selectedTeam} onChange={handleChange} className={styles.filterSelect}>
                <option value="">Alle Teams</option>
                {teams.map(team => (
                    <option key={team.id} value={team.name}>
                        {team.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TeamFilter;
