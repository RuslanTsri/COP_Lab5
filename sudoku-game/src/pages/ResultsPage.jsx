import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ResultsPage.module.css';
import Button from '../components/UI/Button/Button';

const ResultsPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.resultsContainer}>
            <h1 className={styles.title}>Результати</h1>
            <p className={styles.message}>Ви успішно завершили гру!</p>
            <p>(Тут у майбутньому буде статистика: час, очки тощо)</p>
            <Button onClick={() => navigate('/')}>Грати знову</Button>
        </div>
    );
};

export default ResultsPage;