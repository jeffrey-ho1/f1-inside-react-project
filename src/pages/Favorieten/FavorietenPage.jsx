import react from 'react';
import { useAuth } from '../../context/AuthContext';
import DriverCard from '../../components/DriverCard/DriverCard.jsx';
import TeamCard from '../../components/TeamCard/TeamCard.jsx';
import FilterDropdown from '../../components/FilterDropdown/FilterDropdown';
import styles from './FavorietenPage.module.css';


function FavorietenPage() {
    const { favorites, isLoading } = useAuth();
    if (isLoading) {
        return <p>Favorieten worden geladen...</p>;
    }

    const favoriteDrivers = favorites.filter(fav => fav.type === 'driver');
    const favoriteTeams = favorites.filter(fav => fav.type === 'team');


    return (
        <div>
            <div className={styles.header}>
                <h1>Mijn Favorieten</h1>
                <FilterDropdown />
            </div>

            <section className={styles.section}>
                <h2>Favoriete Coureurs</h2>
                {favoriteDrivers.length > 0 ? (
                    <div className={styles.grid}>
                        {favoriteDrivers.map(driver => <DriverCard key={driver.id} driver={driver} />)}
                    </div>
                ) : (
                    <p>Je hebt nog geen favoriete coureurs geselecteerd.</p>
                )}
            </section>

            <section className={styles.section}>
                <h2>Favoriete Teams</h2>
                {favoriteTeams.length > 0 ? (
                    <div className={styles.grid}>
                        {favoriteTeams.map(team => <TeamCard key={team.id} team={team} />)}
                    </div>
                ) : (
                    <p>Je hebt nog geen favoriete teams geselecteerd.</p>
                )}
            </section>
        </div>
    );
}

export default FavorietenPage;
