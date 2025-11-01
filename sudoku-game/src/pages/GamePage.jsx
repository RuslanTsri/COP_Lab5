import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board/Board';
import { useSudoku } from '../hooks/useSudoku';
import styles from './GamePage.module.css';
import { useGameStore } from '../store/useGameStore';
import NumberPad from '../components/UI/NumberPad/NumberPad';
import Button from '../components/UI/Button/Button';

const GamePage = () => {
    const difficulty = useGameStore((state) => state.settings.difficulty);
    const playerName = useGameStore((state) => state.settings.playerName);
    const { finishGame, quitGame } = useGameStore();
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
        if (gameStatus === 'finished') {
            navigate('/results');
        }
    }, [gameStatus, navigate]);


    useEffect(() => {
        const handleKeyPress = (event) => {

            if (/^[1-9]$/.test(event.key)) {

                handleNumberInput(parseInt(event.key, 10));
            }
        };


        window.addEventListener('keydown', handleKeyPress);


        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleNumberInput]);

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

            <div className={styles.quitContainer}>
                <Button onClick={quitGame}>Завершити достроково</Button>
            </div>
        </div>
    );
};

export default GamePage;