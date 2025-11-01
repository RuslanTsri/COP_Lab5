import { useState, useCallback } from 'react';
import { generateSudoku } from '../utils/sudoku';

export const useSudoku = () => {
    const [grid, setGrid] = useState(null);
    const [initialGrid, setInitialGrid] = useState(null);
    const [selectedCell, setSelectedCell] = useState(null);

    // 2. "Обгортаємо" функцію в useCallback
    const createNewGame = useCallback((difficulty) => {
        const newSudoku = generateSudoku(difficulty);
        setGrid(newSudoku.puzzle);
        setInitialGrid(newSudoku.puzzle);
    }, []);

    const handleCellSelect = useCallback((row, col) => {
        if (initialGrid && initialGrid[row][col] === null) {
            setSelectedCell({ row, col });
        }
    }, [initialGrid]);

    const handleNumberInput = useCallback((number) => {
        if (!selectedCell) return;

        setGrid(prevGrid => {
            const { row, col } = selectedCell;
            const newGrid = prevGrid.map(r => [...r]);
            newGrid[row][col] = number;
            return newGrid;
        });
    }, [selectedCell]);

    return {
        grid,
        selectedCell,
        createNewGame,
        handleCellSelect,
        handleNumberInput,
    };
};