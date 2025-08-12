import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <footer>
      Open-sourced by{" "}
      <strong>
        <a
          href="https://github.com/KayRams/react-weather-app"
          target="_blank"
          rel="noreferrer noopener"
        >
          Ingrid Ramoloto
        </a>
      </strong>{" "}
      and hosted on{" "}
      <strong>
        <a
          href="https://react-weather-app19.netlify.app/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Netlify
        </a>
      </strong>
    </footer>
  </React.StrictMode>
);

reportWebVitals();
