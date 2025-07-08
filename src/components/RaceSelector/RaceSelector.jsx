import React from 'react';
import styles from './RaceSelector.module.css';
import Arrow from '../../assets/Arrow.svg?react';

function RaceSelector({ circuits, selectedCircuit, onCircuitChange }) {
    return (
        <div className={styles.selectorContainer}>
            <label htmlFor="circuit-select">Selecteer circuit:</label>

            <div className={styles.selectWrapper}>
                <select
                    id="circuit-select"
                    value={selectedCircuit}
                    onChange={(e) => onCircuitChange(e.target.value)}
                    className={styles.selector}
                >
                    {circuits.map((circuit) => (
                        <option key={circuit.id} value={circuit.id}>
                            {circuit.name}
                        </option>
                    ))}
                </select>

                <Arrow className={styles.selectArrow} />
            </div>
        </div>
    );
}

export default RaceSelector;