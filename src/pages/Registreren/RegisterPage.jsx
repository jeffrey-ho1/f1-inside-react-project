import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/authApi.js';
import PasswordInput from '../../components/PasswordInput/PasswordInput.jsx';
import styles from '../Login/FormPage.module.css';



function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        privacyAccepted: false });
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [apiError, setApiError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const newErrors = {};
        if (formData.username && formData.username.length < 3) newErrors.username = "Gebruikersnaam moet minimaal 3 karakters bevatten.";
        if (formData.password && formData.password.length < 8) newErrors.password = "Wachtwoord moet minimaal 8 karakters bevatten.";
        if (formData.confirmPassword && formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Wachtwoorden komen niet overeen.";
        if (!formData.privacyAccepted) newErrors.privacyAccepted = "U moet de voorwaarden accepteren om te registreren.";

        setErrors(newErrors);

        const isActuallyValid =
            formData.username.length >= 3 &&
            formData.email !== '' &&
            formData.password.length >= 8 &&
            formData.password === formData.confirmPassword &&
            formData.privacyAccepted;

        setIsFormValid(isActuallyValid);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid) {
            return;
        }
        setApiError('');
        try {
            await registerUser({
                username: formData.username,
                email: formData.email,
                password: formData.password });
            setRegistrationSuccess(true);
            setTimeout(() => {
            navigate('/login');
            }, 2000);
        } catch (error) {
            console.error("API-fout bij registreren:", error);
            setApiError(error.message || "Registratie is mislukt.");
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <h2>Registreren</h2>

                {registrationSuccess && <p className={styles.successText}>Account succesvol aangemaakt! U wordt doorgestuurd...</p>}
                {apiError && <p className={styles.apiError}>{apiError}</p>}
                <div className={styles.formGroup}><input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Gebruikersnaam" required />{errors.username && <p className={styles.errorText}>{errors.username}</p>}</div>
                <div className={styles.formGroup}><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mailadres" required /></div>
                <div className={styles.formGroup}><PasswordInput value={formData.password} onChange={(e) => handleChange({ target: { name: 'password', value: e.target.value }})} placeholder="Wachtwoord" />{errors.password && <p className={styles.errorText}>{errors.password}</p>}</div>
                <div className={styles.formGroup}><PasswordInput value={formData.confirmPassword} onChange={(e) => handleChange({ target: { name: 'confirmPassword', value: e.target.value }})} placeholder="Bevestig wachtwoord" />{errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword}</p>}</div>
                <div className={styles.formGroup}><label className={styles.checkboxContainer}><input type="checkbox" name="privacyAccepted" checked={formData.privacyAccepted} onChange={handleChange} />Ik ga akkoord met de <Link to="/nieuws" className={styles.formLink}>privacy voorwaarden</Link>.</label>
                    {errors.privacyAccepted && !formData.privacyAccepted && <p className={styles.errorText}>{errors.privacyAccepted}</p>}
                </div>
                <button type="submit" className={styles.submitButton} disabled={!isFormValid}>Registreren</button>
                <p className={styles.formFooter}>Al een account? <Link to="/login" className={styles.formLink}>Log in</Link>.</p>
            </form>
        </div>
    );
}

export default RegisterPage;