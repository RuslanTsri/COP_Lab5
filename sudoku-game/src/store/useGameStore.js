import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGameStore = create(
    persist(
        (set) => ({
            settings: {
                difficulty: 'easy',
                playerName: 'Гравець 1',
            },
            setSettings: (newSettings) => set({ settings: newSettings }),


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
                    if (state.gameStatus !== 'playing') return {};
                    const endTime = new Date();
                    const newResult = {
                        id: Date.now(),
                        playerName: state.settings.playerName,
                        difficulty: state.settings.difficulty,
                        time: (endTime - state.startTime) / 1000,
                        status: 'won',
                    };
                    return {
                        gameStatus: 'finished',
                        endTime,
                        results: [newResult, ...state.results],
                    };
                });
            },

            quitGame: () => {
                set((state) => {
                    if (state.gameStatus !== 'playing') return {};
                    const endTime = new Date();
                    const newResult = {
                        id: Date.now(),
                        playerName: state.settings.playerName,
                        difficulty: state.settings.difficulty,
                        time: (endTime - state.startTime) / 1000,
                        status: 'quit',
                    };
                    return {
                        gameStatus: 'finished',
                        endTime,
                        results: [newResult, ...state.results],
                    };
                });
            },

            results: [],
        }),
        {
            name: 'sudoku-game-storage',
            partialize: (state) => ({ settings: state.settings, results: state.results }),
        }
    )
);