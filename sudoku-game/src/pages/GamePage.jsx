import React, { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Modal from '../components/UI/Modal/Modal';
import Button from '../components/UI/Button/Button';
import Board from '../components/Board/Board';
import { useSudoku } from '../hooks/useSudoku';
import styles from './GamePage.module.css';

const GamePage = () => {

    const { settings } = useOutletContext();
    const navigate = useNavigate();

    const { grid, createNewGame, selectedCell, handleCellSelect } = useSudoku();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {

        if (settings?.difficulty) {
            createNewGame(settings.difficulty);
        } else {

            navigate('/');
        }
    }, [settings, createNewGame, navigate]);

    const handleFinishGame = () => {
        setIsModalOpen(true);
    };

    if (!grid) {
        return <div>Генерація поля...</div>;
    }

    return (
        <div>

            <h2 className={styles.pageHeader}>
                Гравець: <span className={styles.playerName}>{settings.playerName}</span>, Складність: {settings.difficulty}
            </h2>
            <Board
                grid={grid}
                selectedCell={selectedCell}
                onCellSelect={handleCellSelect}
            />
            <Button onClick={handleFinishGame}>Завершити гру</Button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Гру завершено!</h2>
                <p>Вітаємо, {settings.playerName}!</p>
                <Button onClick={() => navigate('/results')}>Перейти до результатів</Button>
                <Button onClick={() => window.location.reload()}>Почати цей тур заново</Button>
            </Modal>
        </div>
    );
};

export default GamePage;