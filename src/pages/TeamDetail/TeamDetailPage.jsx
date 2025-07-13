import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamDetails } from '../../api/favoritesApi';
import { useAuth } from '../../context/AuthContext';
import styles from './TeamDetailPage.module.css';

function TeamDetailPage() {
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { addFavorite, removeFavorite, isFavorite, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError('');
            const teamData = await getTeamDetails(teamId);
            if (teamData) {
                setTeam(teamData);
            } else {
                setError('Kon de gegevens voor dit team niet laden.');
            }
            setLoading(false);
        };
        void fetchDetails();
    }, [teamId]);

    const isAlreadyFavorite = team ? isFavorite(team.teamId) : false;

    const handleToggleFavorite = () => {
        if (!team) return;

        const favoriteItem = {
            id: team.teamId,
            name: team.teamName,
            type: 'team'
        };

        if (isAlreadyFavorite) {
            removeFavorite(favoriteItem.id);
        } else {
            addFavorite(favoriteItem);
        }
    };

    if (loading) return <p>Details worden geladen...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.detailContainer}>
            {team && (
                <>
                    <h1>{team.teamName}</h1>
                    <div className={styles.infoGrid}>
                        <p><strong>Nationaliteit:</strong> {team.teamNationality}</p>
                        <p><strong>Eerste deelname:</strong> {team.firstAppeareance || 'N/A'}</p>
                        <p><strong>Constructeurskampioenschappen:</strong> {team.constructorsChampionships || '0'}</p>
                        <p><strong>Rijderskampioenschappen:</strong> {team.driversChampionships || '0'}</p>
                    </div>
                    <a href={team.url} target="_blank" rel="noopener noreferrer" className={styles.wikiLink}>
                        Lees meer op Wikipedia
                    </a>
                    {isAuthenticated && (
                        <button
                            type="button"
                            onClick={handleToggleFavorite}
                            className={`${styles.favoriteButton} ${isAlreadyFavorite ? styles.remove : ''}`}>
                            {isAlreadyFavorite ? 'Verwijder uit Favorieten' : 'Voeg toe aan Favorieten'}
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

export default TeamDetailPage;
