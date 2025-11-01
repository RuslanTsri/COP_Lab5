import React, { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingsSchema } from '../utils/validationSchemas';
import Button from '../components/UI/Button/Button';
import styles from './StartPage.module.css';

const StartPage = () => {

    const { settings, setSettings } = useOutletContext();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(settingsSchema),
        defaultValues: settings,
    });

    useEffect(() => {
        if (settings) {
            reset(settings);
        }
    }, [settings, reset]);


    const onSubmit = (data) => {
        setSettings(data);
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