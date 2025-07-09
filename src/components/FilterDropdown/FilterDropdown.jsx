import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllDrivers, getAllTeams } from '../../api/favoritesApi';
import styles from './FilterDropdown.module.css';

function FilterDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [teams, setTeams] = useState([]);
    const { addFavorite, removeFavorite, isFavorite } = useAuth();

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                try {
                    const driverData = await getAllDrivers();
                    const teamData = await getAllTeams();
                    setDrivers(driverData);
                    setTeams(teamData);
                } catch (error) {
                    console.error("Fout bij het ophalen van de filterdata:", error);
                }
            };

            fetchData();
        }
    }, [isOpen]);

    const handleCheckboxChange = (e, item, type) => {
        const favoriteItem = { ...item, type };
        if (e.target.checked) {
            addFavorite(favoriteItem);
        } else {
            removeFavorite(item.id);
        }
    };

    return (
        <div className={styles.dropdownContainer}>
            <button onClick={() => setIsOpen(!isOpen)} className={styles.filterButton}>
                Filter Favorieten
            </button>
            {isOpen && (
                <div className={styles.dropdownMenu}>
                    <section>
                        <h4>Coureurs</h4>
                        {drivers.map(driver => (
                            <div key={driver.id} className={styles.checkboxItem}>
                                <input
                                    type="checkbox"
                                    id={`driver-${driver.id}`}
                                    checked={isFavorite(driver.id)}
                                    onChange={(e) => handleCheckboxChange(e, driver, 'driver')}
                                />
                                <label htmlFor={`driver-${driver.id}`}>{driver.name}</label>
                            </div>
                        ))}
                    </section>
                    <section>
                        <h4>Teams</h4>
                        {teams.map(team => (
                            <div key={team.id} className={styles.checkboxItem}>
                                <input
                                    type="checkbox"
                                    id={`team-${team.id}`}
                                    checked={isFavorite(team.id)}
                                    onChange={(e) => handleCheckboxChange(e, team, 'team')}
                                />
                                <label htmlFor={`team-${team.id}`}>{team.name}</label>
                            </div>
                        ))}
                    </section>
                </div>
            )}
        </div>
    );
}

export default FilterDropdown;