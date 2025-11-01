import React from 'react';
import Button from '../Button/Button';
import styles from './NumberPad.module.css';

const NumberPad = ({ onNumberClick }) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className={styles.numberPad}>
            {numbers.map(num => (
                <Button key={num} onClick={() => onNumberClick(num)}>
                    {num}
                </Button>
            ))}
            {/* Кнопка для стирання */}
            <Button onClick={() => onNumberClick(null)} className={styles.clearButton}>
                X
            </Button>
        </div>
    );
};

export default NumberPad;