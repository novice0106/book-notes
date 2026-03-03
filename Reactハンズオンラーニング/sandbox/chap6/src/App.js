import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ColorList from "./components/ColorList";
import colorData from "./data/color-data.json";
import AddColorForm from "./components/AddColorForm";
import "./App.css";

function App() {
  return (
    <>
      <ColorList></ColorList>
      <AddColorForm></AddColorForm>
    </>
  );
}

export default App;
