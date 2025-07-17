import React from "react";
import "./Weather.css";
export default function Weather() {
  return (
    <div className="Weather">
      <h1>WEATHER SEARCH</h1>
      <form>
        <input type="text" placeholder="Enter a city..." />
        <button type="submit">🔎</button>
      </form>

      <div className="container">
        <div className="row mt-5 mb-3">
          <div className="col-6">
            <strong>
              <h3>20°C</h3>
            </strong>
          </div>
          <div className="col-6">
            <img
              src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
              alt="Partly Cloudy"
            />
          </div>
        </div>
      </div>
      <h2>New York, USA</h2>
      <ul>
        <li>Wednesday 11:00</li>
        <li>Partly Cloudy</li>
        <li>Humidity: 50%</li>
        <li>Wind: 10 km/h</li>
      </ul>
      <footer>
        Open-sourced on{" "}
        <strong>
          <a
            href="https://github.com/KayRams/react-weather-app"
            target="_blank"
            rel="noreferrer noopener"
          >
            Github
          </a>
        </strong>
      </footer>
    </div>
  );
}
