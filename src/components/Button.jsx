import React from 'react';
import PropTypes from 'prop-types';

// Generic Button
const Button = (props) => {
    const baseStyle = `border-4 border-transparent bg-primary text-white rounded-lg px-6 py-2 text-[1.5rem] font-semibold shadow-[0_0_7px_8px_rgba(255,0,0,0.3)] transition-shadow duration-300 relative`;
    const hoverStyle = `hover:shadow-[0_0_7px_15px_rgba(255,0,0,0.3)]`;
    const sizeStyle = props.size === 'small'
        ? 'border-2 px-6 py-1 text-base'
        : '';
    
    return (
        <button
            className={`${baseStyle} ${hoverStyle} ${sizeStyle} ${props.className || ''}`}
            onClick={props.onClick || null}
        >
            {props.children}
        </button>
    );
};

// Outline Button
export const OutlineButton = (props) => {
    const baseStyle = `border-2 border-white bg-transparent text-white font-semibold rounded-lg px-6 py-2 text-[1.5rem] transition-all duration-300`;
    const hoverStyle = `hover:bg-white hover:text-primary`;
    const sizeStyle = props.size === 'small'
        ? 'border px-6 py-1 text-base'
        : '';

    return (
        <button
            className={`${baseStyle} ${hoverStyle} ${sizeStyle} ${props.className || ''}`}
            onClick={props.onClick || null}
        >
            {props.children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small'])
};

export default Button;
