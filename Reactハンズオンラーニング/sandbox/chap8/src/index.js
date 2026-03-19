import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./GithubUser";
import reportWebVitals from "./reportWebVitals";
import List from "./List";

const root = ReactDOM.createRoot(document.getElementById("root"));
const tahoe_peaks = [
  { name: "Freel Peak", elevation: 10891 },
  { name: "Monument Peak", elevation: 10067 },
  { name: "Pyramid Peak", elevation: 9983 },
  { name: "Mt. Tallac", elevation: 9735 },
];
root.render(
  <React.StrictMode>
    <List
      data={tahoe_peaks}
      renderEmpty={() => <p>This list is empty</p>}
      renderItem={(item) => (
        <>
          {item.name} - {item.elevation.toLocaleString()}
        </>
      )}
    ></List>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
