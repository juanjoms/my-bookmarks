import React, { useEffect } from "react";
import './TextField.scss';

export const TextField = ({value, onChange, label, id}: TextFieldProps ) => {
  const handleFocus = (e: React.FocusEvent) => {
    const input: HTMLInputElement = e.target as HTMLInputElement;
    input.select();
    const line = input.nextElementSibling as Element;
    const label = input.previousElementSibling as HTMLLabelElement;
    label.classList.add('float-above');
    line.classList.add('extended');
  };
  const handleBlur = (e: React.FocusEvent) => {
    const input = e.target as HTMLInputElement;
    const line = input.nextElementSibling as Element;
    const label = input.previousElementSibling as HTMLLabelElement;
    line.classList.remove('extended');
    !input.value && label.classList.remove('float-above');
  };

  useEffect(() => {
    const input = document.getElementById(id) as HTMLInputElement;
    const label = input.previousElementSibling as HTMLLabelElement;
    input.value && label.classList.add('float-above');
  }, []);
  return (
    <div className="input-group">
      <label htmlFor={id} className="float-label">{label}</label>
      <input type="text"
        id={id}
        className="input-field"
        value={value}
        onChange={e => onChange(id, e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
      />
      <div className="line-ripple"></div>
    </div>
  );
};

type TextFieldProps = {
  label: string,
  onChange: (id: string, value: string) => void,
  value: string,
  id: string
}
