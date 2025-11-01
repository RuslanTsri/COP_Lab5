
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Cell.module.css';

const Cell = ({ value, isSelected, onClick }) => {
    const cellClasses = `${styles.cell} ${isSelected ? styles.selected : ''}`;
    return (
        <div className={cellClasses} onClick={onClick}>
            {value}
        </div>
    );
};

Cell.propTypes = {
    value: PropTypes.number,
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Cell;