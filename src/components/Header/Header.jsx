import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';
import FormulaOne from '../../assets/FormulaOne.svg?react';
import Settings from '../../assets/Settings.svg?react';
import UnregisteredUser from '../../assets/UnregisteredUser.svg?react';
import RegisteredUser from '../../assets/RegisteredUser.svg?react';
import Search from '../Search/Search';

function Header() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate('/profiel');
        } else {
            navigate('/login');
        }
    };

    return (
        <header className={styles.outerContainerHeader}>
            <div className={styles.header}>
                <Link to="/">
                    <FormulaOne alt="F1 Inside Logo" className={styles.logoImage} />
                </Link>

                <div className={styles.actionButtonsContainer}>
                        {isAuthenticated && (
                            <button className={styles.iconButtonSetting} aria-label="Instellingen">
                                <Settings/>
                            </button>
                        )}
                        <button onClick={handleProfileClick} className={styles.iconButtonUser} aria-label="Profiel">
                            {isAuthenticated ? <RegisteredUser /> : <UnregisteredUser />}
                        </button>
                </div>
            </div>

            <nav className={styles.navigation}>
                    <ul className={styles.navigationUl}>
                        <li>
                            <NavLink to="/nieuws" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
                                Nieuws
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/races" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
                                Races
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/teams" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
                                Teams
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/coureurs" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
                                Coureurs
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/weer" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
                                Weer
                            </NavLink>
                        </li>

                        <li style={{ visibility: isAuthenticated ? 'visible' : 'hidden' }}>
                            <NavLink
                                to="/favorieten"
                                className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                                tabIndex={!isAuthenticated ? -1 : undefined}
                            >
                                Favorieten
                            </NavLink>
                        </li>

                    </ul>
                    <div className={styles.searchContainerInNav}>
                        <Search />
                    </div>
            </nav>
        </header>
    );
}

export default Header;