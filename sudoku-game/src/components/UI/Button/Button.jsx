import React from 'react';

// children — це текст або іконка, які передавати всередину кнопки.
// ...props — атрибути (onClick, className, disabled і т.д.).
const Button = ({ children, ...props }) => {
    return (
        // "прокид" властивостей
        <button {...props}>
            {children}
        </button>
    );
};

export default Button;