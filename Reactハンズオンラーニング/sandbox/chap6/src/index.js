import ColorProvider from "./components/ColorProvider";
import colors from "../src/data/color-data.json";
import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const colorContext = createContext();

root.render(
  <ColorProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ColorProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
