import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GithubUserApp from "./GithubUser";
import reportWebVitals from "./reportWebVitals";
import List from "./List";
import tahoe_peaks from "./data/TahoePeaks";
import fake_users from "./data/FakeUsers";
import FakeUsers from "./FakeUsers"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <GithubUserApp></GithubUserApp>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
