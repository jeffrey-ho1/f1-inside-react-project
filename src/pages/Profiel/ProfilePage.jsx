import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './ProfielPage.module.css';

function ProfilePage() {
    const { user, logout } = useAuth();

    return (
        <div className={styles.profileContainer}>
            <h1>Mijn profiel</h1>
            {user ? (
                <div className={styles.details}>
                    <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>Gebruikersgegevens worden geladen...</p>
            )}

            <button type="button" onClick={logout} className={styles.logoutButton}>
                Uitloggen
            </button>
        </div>
    );
}

export default ProfilePage;