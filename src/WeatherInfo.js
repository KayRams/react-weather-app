import React from "react";
import FormattedDate from "./FormattedDate";
export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <div className="container">
        <div className="row mt-5 mb-3">
          <div className="col-6">
            <strong>
              <h3>{Math.round(props.data.temperature)}°C</h3>
            </strong>
          </div>
          <div className="col-6">
            <img src={props.data.iconUrl} alt={props.data.description} />
          </div>
        </div>
      </div>
      <h2>{props.data.city}</h2>
      <ul>
        <li>
          <FormattedDate date={props.data.date} />
        </li>
        <li className="text-capitalize">{props.data.description}</li>
        <li>Humidity: {props.data.humidity}%</li>
        <li>Wind: {props.data.wind} km/h</li>
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
