// Функція для перевірки, чи є дублікати в масиві (рядку, стовпці, квадраті)
function hasDuplicates(array) {
    const seen = new Set();
    for (const item of array) {
        if (item === null) return false; // Якщо є порожні клітинки, ще не вирішено
        if (seen.has(item)) return true; // Знайшли дублікат
        seen.add(item);
    }
    return false;
}

export function checkSudoku(grid) {
    if (!grid) return false;

    // Перевірка рядків і стовпців
    for (let i = 0; i < 9; i++) {
        const row = grid[i];
        const column = grid.map(r => r[i]);
        if (hasDuplicates(row) || hasDuplicates(column)) {
            return false; // Помилка в рядку або стовпці
        }
    }

    // Перевірка 3x3 квадратів
    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
        for (let boxCol = 0; boxCol < 9; boxCol += 3) {
            const box = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    box.push(grid[boxRow + i][boxCol + j]);
                }
            }
            if (hasDuplicates(box)) {
                return false; // Помилка в квадраті
            }
        }
    }

    return true; // Якщо всі перевірки пройшли, судоку вирішено правильно
}