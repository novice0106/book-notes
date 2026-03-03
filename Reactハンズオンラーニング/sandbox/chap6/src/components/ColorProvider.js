import { v4 as uuidv4 } from "uuid";
import { createContext, useState, useContext } from "react";
import colorData from "../data/color-data.json";

const ColorContext = createContext();
export const useColors = () => useContext(ColorContext);

export default function ColorProvider({ children }) {
  const [colors, setColors] = useState(colorData);

  const addColor = (title, color) => {
    const newColorData = [...colors, { id: uuidv4(), title, color, rating: 0 }];
    setColors(newColorData);
  };
  const removeColor = (id) => {
    setColors(colors.filter((color) => color.id != id));
  };
  const rateColor = (id, rating) => {
    setColors(
      colors.map((color) => (id == color.id ? { ...color, rating } : color))
    );
  };

  return (
    <ColorContext.Provider value={{ colors, addColor, removeColor, rateColor }}>
      {children}
    </ColorContext.Provider>
  );
}
