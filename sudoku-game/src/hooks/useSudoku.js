import { useState, useCallback, useEffect } from 'react'; // Додаємо useEffect
import { generateSudoku } from '../utils/sudoku';
import { checkSudoku } from '../utils/sudokuChecker';

export const useSudoku = (onWin) => {
    const [grid, setGrid] = useState(null);
    const [initialGrid, setInitialGrid] = useState(null);
    const [selectedCell, setSelectedCell] = useState(null);

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

    // ✅ ВИПРАВЛЕНО ТУТ: Перевіряємо перемогу через useEffect
    // Цей код спрацює щоразу, коли `grid` оновиться
    useEffect(() => {
        if (grid) {
            const isFull = grid.every(row => row.every(cell => cell !== null));
            if (isFull && checkSudoku(grid)) {
                onWin(); // Викликаємо колбек при перемозі
            }
        }
    }, [grid, onWin]);

    return {
        grid,
        initialGrid, // Переконуємось, що експортуємо initialGrid
        selectedCell,
        createNewGame,
        handleCellSelect,
        handleNumberInput,
    };
};