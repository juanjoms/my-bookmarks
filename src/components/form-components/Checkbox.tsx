import React from "react";
import './Checkbox.scss';

export const Checkbox = ({checked, onChange}: CheckboxProps ) => (
  <label className="checkbox">
    <input type="checkbox" id="checkbox" className="checkbox__native-control" checked={checked} onChange={e => onChange(!checked)} />
    <div className="checkbox__background">
      <svg className="checkbox__checkmark" viewBox="0 0 24 24">
        <path className="checkbox__checkmark_path" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
      </svg>
      <div className="checkbox__mixedmark"></div>
    </div>
    Open in external tab
  </label>
);

type CheckboxProps = {
  checked: boolean | undefined,
  onChange: (value: boolean) => void,
}
