import React from 'react';
import classes from './Select.module.css'

const Select = ({ value, onChange, items = [], label, name }) => {
    return (
        <div className={classes.Select}>
            {label ? <label htmlFor={name}>{label}</label> : null}
            <select id={name} value={value} onChange={onChange}>
                {items.map((el) => (
                    <option value={el.value} key={el.value}>{el.label}</option>
                ))}
            </select>
        </div>
    );
}

export default Select;