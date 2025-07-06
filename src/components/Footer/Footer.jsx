import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import Facebook from '../../assets/Facebook.svg?react';
import X from '../../assets/X.svg?react';
import Instagram from '../../assets/Instagram.svg?react';
import LinkedIn from '../../assets/Linkedin.svg?react';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <div className={styles.copyright}>
                    <p>
                        © {currentYear} F1 Inside | <Link to="/">Privacy Policy</Link> | <Link to="/">Terms</Link>
                    </p>
                </div>

                <div className={styles.socials}>
                    <div className={styles.socialText}>Volg ons op sociale media</div>
                    <div className={styles.socialLogo}>
                        <Link to="/"><Facebook className={styles.icon} /></Link>
                        <Link to="/"><X className={styles.icon} /></Link>
                        <Link to="/"><Instagram className={styles.icon} /></Link>
                        <Link to="/"><LinkedIn className={styles.icon} /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;