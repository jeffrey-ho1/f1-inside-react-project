import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDriverDetails } from '../../api/favoritesApi';
import { useAuth } from '../../context/AuthContext';
import styles from './CoureurDetailPage.module.css';

function CoureurDetailPage() {
    const { driverId } = useParams(); // Haal de dynamische 'driverId' uit de URL
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { addFavorite, removeFavorite, isFavorite, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError('');
            console.log(`DEBUG: Ophalen van details voor driverId: ${driverId}`);

            const driverData = await getDriverDetails(driverId);
            if (driverData) {
                setDriver(driverData);
            } else {
                setError('Kon de gegevens voor deze coureur niet laden.');
            }
            setLoading(false);
        };

        void fetchDetails();
    }, [driverId]);

    const isAlreadyFavorite = driver? isFavorite(driver.driverId) : false;

    const handleToggleFavorite = () => {
        if (!driver) return;
        const favoriteItem = {
            id: driver.driverId,
            name: `${driver.name} ${driver.surname}`,
            type: 'driver'
        };

        if (isAlreadyFavorite) {
            removeFavorite(favoriteItem.id);
        } else {
            addFavorite(favoriteItem);
        }
    };

    if (loading) {
        return <p>Details worden geladen...</p>;
    }

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    return (
        <div className={styles.detailContainer}>
            {driver && (
                <>
                    <img src={driver.headshot_url} alt={driver.full_name} className={styles.headshot} />
                    <h1>{driver.full_name}</h1>
                    <div className={styles.infoGrid}>
                        <p><strong>Team:</strong> {driver.team_name}</p>
                        <p><strong>Nummer:</strong> {driver.driver_number}</p>
                        <p><strong>Land:</strong> {driver.country_code}</p>
                    </div>
                    {isAuthenticated && (
                        <button
                            type="button"
                            onClick={handleToggleFavorite}
                            className={`${styles.favoriteButton} ${isAlreadyFavorite ? styles.remove : ''}`}
                        >
                            {isAlreadyFavorite ? 'Verwijder uit Favorieten' : 'Voeg toe aan Favorieten'}
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

export default CoureurDetailPage;
