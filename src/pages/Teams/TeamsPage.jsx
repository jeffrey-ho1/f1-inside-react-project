import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTeams } from '../../api/favoritesApi';
import styles from './TeamsPage.module.css';

function TeamsPage() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            const teamData = await getAllTeams();
            setTeams(teamData);
            setLoading(false);
        };

        void fetchTeams();
    }, []);

    if (loading)
        return <p>Teams worden geladen...</p>;

    return (
        <div className={styles.pageContainer}>
            <h1>Alle Teams</h1>
            <div className={styles.grid}>
                {teams.map(team => (
                    <Link to={`/teams/${team.id}`} key={team.id} className={styles.cardLink}>
                        <div className={styles.teamCard}>
                            <h4>{team.name}</h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TeamsPage;
