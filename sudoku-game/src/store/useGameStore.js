import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGameStore = create(
    persist(
        (set) => ({
            // --- Модуль Налаштувань ---
            settings: {
                difficulty: 'easy',
                playerName: 'Гравець 1',
            },
            setSettings: (newSettings) => set({ settings: newSettings }),

            // --- Модуль Ігрової логіки ---
            gameStatus: 'idle',
            startTime: null,
            endTime: null,
            startGame: (settings) => {
                set({
                    settings,
                    gameStatus: 'playing',
                    startTime: new Date(),
                    endTime: null,
                });
            },
            // Цей екшен для перемоги
            finishGame: () => {
                set((state) => {
                    if (state.gameStatus !== 'playing') return {}; // Захист від подвійного виклику
                    const endTime = new Date();
                    const newResult = {
                        id: Date.now(),
                        playerName: state.settings.playerName,
                        difficulty: state.settings.difficulty,
                        time: (endTime - state.startTime) / 1000,
                        status: 'won', // Статус "перемога"
                    };
                    return {
                        gameStatus: 'finished',
                        endTime,
                        results: [newResult, ...state.results],
                    };
                });
            },
            // ✅ НОВИЙ ЕКШЕН для дострокового завершення
            quitGame: () => {
                set((state) => {
                    if (state.gameStatus !== 'playing') return {};
                    const endTime = new Date();
                    const newResult = {
                        id: Date.now(),
                        playerName: state.settings.playerName,
                        difficulty: state.settings.difficulty,
                        time: (endTime - state.startTime) / 1000,
                        status: 'quit', // Статус "достроково"
                    };
                    return {
                        gameStatus: 'finished',
                        endTime,
                        results: [newResult, ...state.results],
                    };
                });
            },
            // --- Модуль Результатів ---
            results: [],
        }),
        {
            name: 'sudoku-game-storage',
            partialize: (state) => ({ settings: state.settings, results: state.results }),
        }
    )
);