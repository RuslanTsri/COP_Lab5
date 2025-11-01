import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board/Board';
import { useSudoku } from '../hooks/useSudoku';
import styles from './GamePage.module.css';
import { useGameStore } from '../store/useGameStore';
import NumberPad from '../components/UI/NumberPad/NumberPad';
import Button from '../components/UI/Button/Button'; // Імпортуємо кнопку

const GamePage = () => {
    const difficulty = useGameStore((state) => state.settings.difficulty);
    const playerName = useGameStore((state) => state.settings.playerName);
    const { finishGame, quitGame } = useGameStore(); // Дістаємо обидва екшени
    const gameStatus = useGameStore((state) => state.gameStatus);
    const navigate = useNavigate();

    const { grid, initialGrid, selectedCell, createNewGame, handleCellSelect, handleNumberInput } = useSudoku(finishGame);

    useEffect(() => {
        if (difficulty) {
            createNewGame(difficulty);
        } else {
            navigate('/');
        }
    }, [difficulty, createNewGame, navigate]);

    useEffect(() => {
        // Цей ефект перенаправить на результати при будь-якому завершенні гри
        if (gameStatus === 'finished') {
            navigate('/results');
        }
    }, [gameStatus, navigate]);

    if (!grid || !initialGrid) {
        return <div>Генерація поля...</div>;
    }

    return (
        <div>
            <h2 className={styles.pageHeader}>
                Гравець: <span className={styles.playerName}>{playerName}</span>, Складність: {difficulty}
            </h2>
            <Board
                grid={grid}
                initialGrid={initialGrid}
                selectedCell={selectedCell}
                onCellSelect={handleCellSelect}
            />
            <NumberPad onNumberClick={handleNumberInput} />

            {/* ✅ Повертаємо кнопку з новою логікою */}
            <div className={styles.quitContainer}>
                <Button onClick={quitGame}>Завершити достроково</Button>
            </div>
        </div>
    );
};

export default GamePage;