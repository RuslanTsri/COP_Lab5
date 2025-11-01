import React from 'react';
import PropTypes from 'prop-types';
import styles from './Cell.module.css';

const Cell = ({ value, isInitial, isSelected, onClick }) => {
    // Збираємо класи
    const cellClasses = `
    ${styles.cell} 
    ${isSelected ? styles.selected : ''} 
    ${isInitial ? styles.initial : styles.editable}
  `;

    return (
        <div className={cellClasses} onClick={isInitial ? null : onClick}>
            {value}
        </div>
    );
};

Cell.propTypes = {
    value: PropTypes.number,
    isInitial: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Cell;