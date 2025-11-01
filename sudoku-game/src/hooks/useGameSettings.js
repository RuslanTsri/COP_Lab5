import { useState, useEffect } from 'react';

const SETTINGS_KEY = 'sudokuSettings';

export const useGameSettings = () => {
    const [settings, setSettings] = useState(() => {

        try {
            const savedSettings = localStorage.getItem(SETTINGS_KEY);
            return savedSettings ? JSON.parse(savedSettings) : { difficulty: 'easy', playerName: 'Гравець 1' };
        } catch (error) {
            console.error("Не вдалося завантажити налаштування", error);
            return { difficulty: 'easy', playerName: 'Гравець 1' };
        }
    });


    useEffect(() => {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        } catch (error) {
            console.error("Не вдалося зберегти налаштування", error);
        }
    }, [settings]);

    return [settings, setSettings];
};