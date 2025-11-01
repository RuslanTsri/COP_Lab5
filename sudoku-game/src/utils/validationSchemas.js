import * as yup from 'yup';

export const settingsSchema = yup.object().shape({
    difficulty: yup.string().oneOf(['easy', 'medium', 'hard']).required(),


    playerName: yup.string()
        .transform(value => value.trim() === '' ? undefined : value)
        .default('Гравець 1')
        .max(15, 'Ім\'я занадто довге'),
});