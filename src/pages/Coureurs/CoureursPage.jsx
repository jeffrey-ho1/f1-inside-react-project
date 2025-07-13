import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {getAllDrivers, getAllTeams} from '../../api/favoritesApi';
import styles from './CoureursPage.module.css';
import AdvancedFilter from "../../components/AdvancedFilter/AdvancedFilter.jsx";
import {useAuth} from "../../context/AuthContext.jsx";

function CoureursPage() {
    const [allDrivers, setAllDrivers] = useState([]);
    const [allTeams, setAllTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        team: '',
        nationality: ''
    });
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchData= async () => {
            setLoading(true);
            const [driverData, teamData] = await Promise.all([
                getAllDrivers(),
                getAllTeams(),
            ]);
            setAllDrivers(driverData);
            setAllTeams(teamData);
            setLoading(false);
        };
        void fetchData();
    }, [isAuthenticated]);

const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
        ...prevFilters,
        [filterName]: value
    }));
};

const uniqueNationalities = useMemo(() => {
    const nationalities = allDrivers.map(driver => driver.nationality).filter(Boolean);
    return [...new Set(nationalities)].sort();
}, [allDrivers]);

const filteredDrivers = useMemo(() => {
    return allDrivers.filter(driver => {
        const teamMatch = !filters.team || driver.teamId === filters.team;
        const nationalityMatch = !filters.nationality || driver.nationality === filters.nationality;
        return teamMatch && nationalityMatch;
    });
}, [allDrivers, filters]);

if (loading) return <p>Coureurs worden geladen...</p>;

    return (
        <div className={styles.pageContainer}>
            <h1>Alle Coureurs</h1>
            <AdvancedFilter
                teams={allTeams}
                nationalities={uniqueNationalities}
                onFilterChange={handleFilterChange}
            />
            <div className={styles.grid}>
                {filteredDrivers.map(driver => {
                    const team = allTeams.find(t => t.id === driver.teamId);
                    return (
                        <Link to={`/coureurs/${driver.id}`} key={driver.id} className={styles.cardLink}>
                            <div className={styles.driverCard}>
                                <h4>{driver.name}</h4>
                                <p>{team ? team.name : 'Onbekend Team'}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default CoureursPage;
