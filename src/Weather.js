import React, { useState } from "react";
import FormattedDate from "./FormattedDate";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  function handleResponse(response) {
    setWeatherData({
      ready: true,
      date: new Date(response.data.dt * 1000),
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      city: response.data.name,
      iconUrl: "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
    });
  }

  if (weatherData.ready) {
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
                <h3>{Math.round(weatherData.temperature)}°C</h3>
              </strong>
            </div>
            <div className="col-6">
              <img src={weatherData.iconUrl} alt={weatherData.description} />
            </div>
          </div>
        </div>
        <h2>{weatherData.city}</h2>
        <ul>
          <li>
            <FormattedDate date={weatherData.date} />
          </li>
          <li className="text-capitalize">{weatherData.description}</li>
          <li>Humidity: {weatherData.humidity}%</li>
          <li>Wind: {weatherData.wind} km/h</li>
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
  } else {
    const apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);

    return "Loading...";
  }
}
