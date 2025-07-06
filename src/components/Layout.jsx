import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import styles from './Layout.module.css';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main className={styles.mainContent}>
                {children}
            </main>
            <Footer />
        </>
    );
}