import React from "react";
import './Checkbox.scss';

export const Checkbox = ({checked, onChange}: CheckboxProps ) => (
  <label className="mdc-checkbox">
    <input type="checkbox" id="checkbox" className="mdc-checkbox__native-control" checked={checked} onChange={e => onChange(!checked)} />
    <div className="mdc-checkbox__background">
      <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
        <path stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
      </svg>
      <div className="mdc-checkbox__mixedmark"></div>
    </div>
    Open in external tab
  </label>
);

type CheckboxProps = {
  checked: boolean | undefined,
  onChange: (value: boolean) => void,
}
