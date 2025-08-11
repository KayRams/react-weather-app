import React, { useState } from "react";
import FormattedDate from "./FormattedDate";

export default function WeatherInfo(props) {
  function getLocalTimeFromOffset(offsetInSeconds) {
    const nowUTC = new Date(
      new Date().getTime() + new Date().getTimezoneOffset() * 60000
    );
    const localTime = new Date(nowUTC.getTime() + offsetInSeconds * 1000);
    return localTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const [unit, setUnit] = useState("Celsius");

  function convertToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }

  function handleCelsiusClick(event) {
    event.preventDefault();
    setUnit("Celsius");
  }

  function handleFahrenheitClick(event) {
    event.preventDefault();
    setUnit("Fahrenheit");
  }

  let temperature = props.data.temperature;
  if (unit === "Fahrenheit") {
    temperature = convertToFahrenheit(temperature);
  }

  return (
    <div className="WeatherInfo">
      <div className="container">
        <div className="row mt-5 mb-3">
          <div className="col-3 pe-0 text-end">
            <strong>
              <h3>{Math.round(temperature)}</h3>
            </strong>
          </div>
          <div className="col-3 ps-0" id="unit">
            <a
              href="/"
              onClick={handleCelsiusClick}
              className={unit === "Celsius" ? "active" : ""}
            >
              °C
            </a>{" "}
            |{" "}
            <a
              href="/"
              onClick={handleFahrenheitClick}
              className={unit === "Fahrenheit" ? "active" : ""}
            >
              °F
            </a>
          </div>
          <div className="col-6">
            <img src={props.data.iconUrl} alt={props.data.description} />
          </div>
        </div>
      </div>
      <h2>{props.data.city}</h2>
      <ul>
        <li>Local Time: {getLocalTimeFromOffset(props.data.timezone)}</li>
        <li>
          <FormattedDate
            date={props.data.date}
            timezone={props.data.timezone}
          />
        </li>
        <li className="text-capitalize">{props.data.description}</li>
        <li>Humidity: {props.data.humidity}%</li>
        <li>Wind: {props.data.wind} km/h</li>
      </ul>
    </div>
  );
}
