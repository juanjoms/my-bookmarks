import React from "react";
import "./Palette.scss";

type CellProps = {
  color: string,
  onClick: any
}
const Cell = ({ color, onClick }: CellProps) => (
  <div
    className="cell"
    onClick={() => onClick(color)}
    style={{ background: color }}
  />
);

type PaletteProps = {
  onSelectColor: (color: string) => void
}
export const Palette = ({ onSelectColor }: PaletteProps) => {
  const colors = [
    "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4",  "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800"
  ];

  const orderedColors = [
    ...colors.slice(0, 5),
    ...colors.slice(5, 10).reverse(),
    ...colors.slice(10, 15)
  ];

  return (
    <div className="Palette">
      {orderedColors.map((color, index) => (
        <Cell key={index} color={color} onClick={() => onSelectColor(color)} />
      ))}
    </div>
  );
}
