import React from 'react';
const Button = ({ children, ...props }) => {
    return (
        // "прокид" властивостей
        <button {...props}>
            {children}
        </button>
    );
};

export default Button;