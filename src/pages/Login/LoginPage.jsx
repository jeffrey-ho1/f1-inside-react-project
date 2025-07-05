import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import PasswordInput from '../../components/PasswordInput/PasswordInput.jsx';
import styles from "./FormPage.module.css";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const { login } = useContext(AuthContext);

    useEffect(() => {
        const validity = username.length > 0 && password.length > 0;
        setIsFormValid(validity);
    }, [username, password]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await login({ username, password });
        } catch (err) {
            setError(err.message || "Inloggen mislukt. Controleer je gegevens.");
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <h2>Inloggen</h2>
                {error && <p className={styles.apiError}>{error}</p>}
                <div className={styles.formGroup}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Gebruikersnaam of E-mail" required />
                </div>
                <div className={styles.formGroup}>
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Wachtwoord" />
                </div>
                <p className={styles.forgotPassword}>
                    <a href="#" onClick={() => alert('Functie nog niet geïmplementeerd.')} className={styles.formLink}>
                        Gegevens opvragen
                    </a>
                </p>
                <button type="submit" className={styles.submitButton} disabled={!isFormValid}>Login</button>
                <p className={styles.formFooter}>
                    Nog geen account? <Link to="/register" className={styles.formLink}>Registreer hier</Link>.
                </p>
            </form>
        </div>
    );
}

export default LoginPage;;