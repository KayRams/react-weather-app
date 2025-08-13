import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";
import { PuffLoader } from "react-spinners";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [error, setError] = useState(null);

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      date: new Date(response.data.dt * 1000),
      timezone: response.data.timezone,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      city: response.data.name,
      iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    setError(null);
  }

  function search() {
    setWeatherData({ ready: false });
    setError(null);

    const apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch(function (error) {
        setWeatherData({ ready: false });
        if (error.response && error.response.status === 404) {
          setError("City not found. Please check the spelling.");
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
    setError(null);
  }

  return (
    <div className="Weather">
      {/* Always show the search form for city input */}
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a city..."
          autoFocus="on"
          onChange={handleCityChange}
        />
        <button type="submit">🔎</button>
      </form>

      {/* Display error message if any */}
      {error && <div className="ErrorMessage">{error}</div>}

      {/* Display weather information and forecast if data is ready */}
      {weatherData.ready ? (
        <>
          <WeatherInfo data={weatherData} />
          <WeatherForecast coordinates={weatherData.coordinates} />
        </>
      ) : !error ? (
        <div className="Spinner">
          <PuffLoader
            color="orangered"
            loading={true}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : null}
    </div>
  );
}
