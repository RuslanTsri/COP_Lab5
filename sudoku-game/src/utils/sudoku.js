
export const generateSudoku = (difficulty) => {
    // Повністю вирішене поле
    const solution = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];

    // Копіюємо вирішене поле, щоб створити "загадку"
    let puzzle = solution.map(row => [...row]);

    // Кількість клітинок, які треба "стерти", залежно від складності
    const holes = {
        easy: 20,
        medium: 40,
        hard: 60,
    };

    let removed = 0;
    while (removed < holes[difficulty]) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] !== null) {
            puzzle[row][col] = null; // "Стираємо" число
            removed++;
        }
    }

    return { puzzle, solution };
};