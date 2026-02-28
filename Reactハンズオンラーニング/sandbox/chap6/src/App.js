import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ColorList from "./components/ColorList";
import colorData from "./data/color-data.json";
import AddColorForm from "./components/AddColorForm";
import "./App.css";

function App() {
  const [colors, setColors] = useState(colorData);
  return (
    <>
      <ColorList
        colors={colors}
        onRateColor={(id, rating) => {
          const newColors = colors.map((color) =>
            color.id === id ? { ...color, rating } : color
          );
          setColors(newColors);
        }}
        onRemoveColor={(id) => {
          const newColors = colors.filter((color) => color.id !== id);
          setColors(newColors);
        }}
      ></ColorList>
      <AddColorForm
        onNewColor={(title, color) => {
          const newId = uuidv4();
          const newColors = [
            ...colors,
            { id: newId, title: title, color: color, rating: 0 },
          ];
          setColors(newColors);
        }}
      ></AddColorForm>
    </>
  );
}

export default App;
