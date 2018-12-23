import React from 'react';
import './Button.scss';

export const Button = ({value, isPrimary, onClick}: {value: string, isPrimary: boolean, onClick: () => void} ) => (
  <button className={`button ${isPrimary?'primary':'secondary'}`} onClick={onClick}>{value}</button>
);
