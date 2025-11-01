import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingsSchema } from '../utils/validationSchemas';
import Button from '../components/UI/Button/Button';
import { useGameStore } from '../store/useGameStore';
import styles from './StartPage.module.css';

const StartPage = () => {
    // 2. Дістаємо налаштування і функцію для їх зміни зі стору
    const settings = useGameStore((state) => state.settings);
    const startGame = useGameStore((state) => state.startGame);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(settingsSchema), // <-- ДОДАЙТЕ ЦЕЙ РЯДОК
        defaultValues: settings,
    });

    useEffect(() => {
        if (settings) reset(settings);
    }, [settings, reset]);

    const onSubmit = (data) => {
        startGame(data); // 3. Викликаємо екшен зі стору
        navigate('/game');
    };

    return (
        <div>
            <h1>Налаштування Судоку</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.field}>
                    <label htmlFor="playerName">Ім'я гравця:</label>
                    <input id="playerName" {...register('playerName')} />
                    {errors.playerName && <p className={styles.error}>{errors.playerName.message}</p>}
                </div>

                <div className={styles.field}>
                    <label>Складність:</label>
                    <select {...register('difficulty')}>
                        <option value="easy">Легка</option>
                        <option value="medium">Середня</option>
                        <option value="hard">Складна</option>
                    </select>
                    {errors.difficulty && <p className={styles.error}>{errors.difficulty.message}</p>}
                </div>

                <Button type="submit">Почати гру</Button>
            </form>
        </div>
    );
};

export default StartPage;