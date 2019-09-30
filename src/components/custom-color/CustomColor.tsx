import React, { useEffect } from "react";
import "./CustomColor.scss";
type CustomColorProps = {
  color: string;
  onSelectColor: (value: string) => void;
}
export const CustomColor = ({ color, onSelectColor }: CustomColorProps) => (
  <div className="CustomColor">
    <input
      type="text"
      className="custom"
      style={{ borderColor: color }}
      value={color}
      onChange={e => onSelectColor(e.target.value)}
    />
    <RGBColor color={color} onSelectColor={onSelectColor} />
  </div>
);

function RGBColor({ color, onSelectColor }: any) {
  let hex = color.replace("#", "");
  hex =
    hex.length === 3
      ? hex
          .split("")
          .map((c: string) => c + c)
          .join("")
      : hex;

  const R = parseInt(hex.substr(0, 2), 16) || 0;
  const G = parseInt(hex.substr(2, 2), 16) || 0;
  const B = parseInt(hex.substr(4, 2), 16) || 0;

  const handleColorChange = (label: string, value: any) => {
    let newColor = color.replace("#", "");
    const R = newColor.substr(0, 2);
    const G = newColor.substr(2, 2);
    const B = newColor.substr(4, 2);
    value = value > 255 ? 255 : !value ? 0 : value;
    value = ("00" + parseInt(value, 10).toString(16)).toUpperCase().slice(-2);

    switch (label) {
      case "R":
        newColor = `#${value}${G}${B}`;
        break;
      case "G":
        newColor = `#${R}${value}${B}`;
        break;
      default:
        newColor = `#${R}${G}${value}`;
        break;
    }
    onSelectColor(newColor);
  };
  return (
    <div>
      <RBGItem label="R" value={R} key="R" onChange={handleColorChange} />
      <RBGItem label="G" value={G} key="G" onChange={handleColorChange} />
      <RBGItem label="B" value={B} key="B" onChange={handleColorChange} />
    </div>
  );
}

function RBGItem({ label, value, onChange }: any) {
  useEffect(() => {
    const handleKey = (evt: any) => {
      if (evt.keyCode === 38) {
        evt.preventDefault();
        onChange(label, parseInt(evt.target.value) + 1);
      } else if (evt.keyCode === 40) {
        onChange(label, parseInt(evt.target.value) - 1);
      }
    };
    const input = document.getElementById(label) as HTMLInputElement ;
    input.addEventListener("keydown", handleKey);
    return () => {
      input.removeEventListener("keydown", handleKey);
    };
  }, []);
  return (
    <div className="rgbgroup">
      <div className="rgblabel">{label}</div>
      <input
        id={label}
        className="rgb"
        value={value}
        onChange={e => onChange(label, e.target.value)}
        type="text"
        autoComplete="off"
      />
    </div>
  );
}
