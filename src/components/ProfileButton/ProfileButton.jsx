import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './ProfileButton.module.css';
import LoginIcon from '../../assets/login-icon.svg?react';
import ProfileIcon from '../../assets/profile-icon.svg?react';

function ProfileButton() {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        isAuthenticated ? navigate('/profiel') : navigate('/login');
    };

    return (
        <button
            className={styles.profileButton}
            onClick={handleClick}
            aria-label={isAuthenticated ? `Profiel van ${user?.username}` : 'Inloggen'}
        >
            {isAuthenticated ? <ProfileIcon className={styles.icon} /> : <LoginIcon className={styles.icon} />}
        </button>
    );
}
export default ProfileButton;
