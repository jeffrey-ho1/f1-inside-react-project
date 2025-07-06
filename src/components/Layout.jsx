import React from 'react';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import styles from './Layout.module.css';
import flagBackgroundUrl from '../assets/FlagBackground.jpg?url';

export default function Layout({ children }) {

    console.log('Pad naar achtergrondafbeelding:', flagBackgroundUrl);

    return (
        <>
            <Header />
            <main
                className={styles.mainContent}
                style={{
                    backgroundImage: `url(${flagBackgroundUrl})`,
                    backgroundSize: '100px', // We gebruiken een vaste grootte voor de test
                    backgroundRepeat: 'repeat' // Herhaal het patroon
                }}
            >
                {children}
            </main>
            <Footer />
        </>
    );
}