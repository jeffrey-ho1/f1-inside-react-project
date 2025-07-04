import React, { useState } from 'react';
import styles from './PasswordInput.module.css';
import EyeOpenIcon from '../../assets/eye-open.svg?react';
import EyeClosedIcon from '../../assets/eye-closed.svg?react';


function PasswordInput({ value, onChange, placeholder }) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(prevIsVisible => !prevIsVisible);
    };
//
    return (
        <div className={styles.passwordWrapper}>
            <input
                type={isVisible ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className={styles.inputField}
            />
            <button type="button" onClick={toggleVisibility} className={styles.eyeButton}>
                {isVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
            </button>
        </div>
    );
}

export default PasswordInput;