import React from 'react';
import styles from './RaceSelector.module.css';
import Arrow from '../../assets/Arrow.svg?react';

function RaceSelector({ races, selectedRace, onRaceChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectorRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectorRef.current && !selectorRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (raceId) => {
        onRaceChange(raceId);
        setIsOpen(false);
    };

    const currentRace = races.find(race => race.round === selectedRace);


    return (
        <div className={styles.selectorContainer} ref={selectorRef}>
            <div className={styles.selectedValue} onClick={() => setIsOpen(!isOpen)}>
                <span>{currentRace ? currentRace.raceName : 'Kies een race'}</span>
                <Arrow className={`${styles.arrow} ${isOpen ? styles.open : ''}`} />
            </div>
            {isOpen && (
                <ul className={styles.optionsList}>
                    {races.map((race) => (
                        <li
                            key={race.round}
                            onClick={() => handleSelect(race.round)}
                            className={styles.optionItem}
                        >
                            {race.raceName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RaceSelector;