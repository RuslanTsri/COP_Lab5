import React from 'react';
import PropTypes from 'prop-types';
import styles from './Board.module.css';
import Cell from '../Cell/Cell';

const Board = ({ grid, initialGrid, selectedCell, onCellSelect }) => {
    return (
        <div className={styles.board}>
            {grid.map((row, rowIndex) =>
                row.map((value, colIndex) => {
                    const isInitial = initialGrid[rowIndex][colIndex] !== null;
                    return (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            value={value}
                            isInitial={isInitial} // Чи є клітинка початковою
                            isSelected={
                                selectedCell &&
                                selectedCell.row === rowIndex &&
                                selectedCell.col === colIndex
                            }
                            onClick={() => onCellSelect(rowIndex, colIndex)}
                        />
                    );
                })
            )}
        </div>
    );
};

Board.propTypes = {
    grid: PropTypes.array.isRequired,
    initialGrid: PropTypes.array.isRequired,
    selectedCell: PropTypes.object,
    onCellSelect: PropTypes.func.isRequired,
};

export default Board;