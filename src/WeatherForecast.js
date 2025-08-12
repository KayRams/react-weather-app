import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherForecast.css";
import { DotLoader } from "react-spinners";

export default function WeatherForecast({ coordinates }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coordinates) return;

    const apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    setLoading(true);

    axios.get(apiUrl).then((response) => {
      const dailyData = {};

      response.data.list.forEach((reading) => {
        const date = new Date(reading.dt * 1000);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });

        if (!dailyData[day]) {
          dailyData[day] = {
            temps: [],
            icon: reading.weather[0].icon,
            description: reading.weather[0].description,
          };
        }

        dailyData[day].temps.push(reading.main.temp);
      });

      const dailyForecast = Object.keys(dailyData).map((day) => {
        const temps = dailyData[day].temps;
        return {
          day,
          max: Math.round(Math.max(...temps)),
          min: Math.round(Math.min(...temps)),
          icon: dailyData[day].icon,
          description: dailyData[day].description,
        };
      });

      setForecast(dailyForecast.slice(0, 5));
      setLoading(false);
    });
  }, [coordinates]);

  if (loading) {
    return (
      <div className="Spinner">
        <DotLoader
          color="orangered"
          loading={true}
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="forecast-container">
      <div className="forecast-list">
        {forecast.map((dayData, index) => (
          <div key={index} className="forecast-item">
            <div className="forecast-day">{dayData.day}</div>
            <img
              className="forecast-icon"
              src={`https://openweathermap.org/img/wn/${dayData.icon}@2x.png`}
              alt={dayData.description}
            />
            <div>
              <span className="forecast-temps">
                <strong>{dayData.max}°</strong>/{dayData.min}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
