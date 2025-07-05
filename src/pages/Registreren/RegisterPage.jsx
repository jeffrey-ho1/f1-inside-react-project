import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/authApi.js';
import PasswordInput from '../../components/PasswordInput/PasswordInput.jsx';
import styles from '../Login/FormPage.module.css';



function RegisterPage() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '', privacyAccepted: false });
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log("TEST: Validatie wordt uitgevoerd voor:", formData);
        const newErrors = {};
        if (formData.username && formData.username.length < 3) newErrors.username = "Gebruikersnaam moet minimaal 3 karakters bevatten.";
        if (formData.password && formData.password.length < 8) newErrors.password = "Wachtwoord moet minimaal 8 karakters bevatten.";
        if (formData.confirmPassword && formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Wachtwoorden komen niet overeen.";
        setErrors(newErrors);

        const allFieldsFilled = Object.values(formData).every(value => value !== '' && value !== false);
        const noErrors = Object.keys(newErrors).length === 0;
        const finalValidity = allFieldsFilled && noErrors;
        console.log("TEST: Is formulier geldig?", finalValidity);
        setIsFormValid(finalValidity);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log(`TEST: Veld '${name}' gewijzigd naar:`, type === 'checkbox' ? checked : value);
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid) return;
        setApiError('');
        try {
            console.log("TEST: Registratieformulier wordt verstuurd met data:", formData);
            await registerUser({ username: formData.username, email: formData.email, password: formData.password });
            alert('Account succesvol aangemaakt! Je wordt doorgestuurd naar de loginpagina.');
            navigate('/login');
        } catch (error) {
            console.error("TEST: API-fout bij registreren:", error);
            setApiError(error.message || "Registratie is mislukt.");
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <h2>Registreren</h2>
                {apiError && <p className={styles.apiError}>{apiError}</p>}
                <div className={styles.formGroup}><input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Gebruikersnaam" required />{errors.username && <p className={styles.errorText}>{errors.username}</p>}</div>
                <div className={styles.formGroup}><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mailadres" required /></div>
                <div className={styles.formGroup}><PasswordInput value={formData.password} onChange={(e) => handleChange({ target: { name: 'password', value: e.target.value }})} placeholder="Wachtwoord" />{errors.password && <p className={styles.errorText}>{errors.password}</p>}</div>
                <div className={styles.formGroup}><PasswordInput value={formData.confirmPassword} onChange={(e) => handleChange({ target: { name: 'confirmPassword', value: e.target.value }})} placeholder="Bevestig wachtwoord" />{errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword}</p>}</div>
                <div className={styles.formGroup}><label className={styles.checkboxContainer}><input type="checkbox" name="privacyAccepted" checked={formData.privacyAccepted} onChange={handleChange} />Ik ga akkoord met de <Link to="/nieuws" className={styles.formLink}>privacy voorwaarden</Link>.</label></div>
                <button type="submit" className={styles.submitButton} disabled={!isFormValid}>Account aanmaken</button>
                <p className={styles.formFooter}>Al een account? <Link to="/login" className={styles.formLink}>Log in</Link>.</p>
            </form>
        </div>
    );
}

export default RegisterPage;