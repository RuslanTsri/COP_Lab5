import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import Button from '../components/UI/Button/Button';
import styles from './ResultsPage.module.css';

const ResultsPage = () => {
    const navigate = useNavigate();
    const results = useGameStore((state) => state.results);

    // Дістаємо останній результат, щоб показати повідомлення
    const latestResult = results.length > 0 ? results[0] : null;

    const getMessage = () => {
        if (!latestResult) {
            return "Зіграйте свою першу гру!";
        }
        if (latestResult.status === 'won') {
            return `Вітаємо з перемогою! Ваш час: ${latestResult.time.toFixed(2)} сек.`;
        }
        return `Ви завершили гру достроково. Ваш час: ${latestResult.time.toFixed(2)} сек.`;
    };

    return (
        <div className={styles.resultsContainer}>
            <h1 className={styles.title}>Результати</h1>
            <p className={styles.message}>{getMessage()}</p>

            {results.length > 0 ? (
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Гравець</th>
                        <th>Складність</th>
                        <th>Час (сек)</th>
                        <th>Статус</th> {/* Нова колонка */}
                    </tr>
                    </thead>
                    <tbody>
                    {results.map(result => (
                        <tr key={result.id}>
                            <td>{result.playerName}</td>
                            <td>{result.difficulty}</td>
                            <td>{result.time.toFixed(2)}</td>
                            {/* Відображаємо статус */}
                            <td>{result.status === 'won' ? 'Перемога' : 'Достроково'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className={styles.message}>Ще немає результатів.</p>
            )}
            <Button onClick={() => navigate('/')}>На головну</Button>
        </div>
    );
};
export default ResultsPage;