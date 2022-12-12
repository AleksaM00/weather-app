import React, { useState } from "react";
import classes from "./Weather.module.css";

const Weather = () => {
  // api 6b42a8cd7827c2a7e0db8fc59e31c9c1
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});

  let date = new Date().toLocaleString();

  const searchLocation = (e) => {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=6b42a8cd7827c2a7e0db8fc59e31c9c1`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeather(data);
        setLocation("");
      });
  };
  return (
    <section className={classes.weather}>
      <form onSubmit={searchLocation}>
        <input
          type="text"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          placeholder="Enter City"
        />
        <button type="submit">Search</button>
      </form>

      {weather.cod === "404" && (
        <h1 className={classes.error}>{weather.message}</h1>
      )}

      {typeof weather.main !== "undefined" && (
        <div className={classes.mainWeather}>
          <h1 className={classes.country}>
            {weather.name}, {weather.sys.country}
          </h1>
          <p className={classes.date}>{date}</p>

          <h1 className={classes.temp}> {Math.round(weather.main.temp)} ℃ </h1>

          <div className={classes.description}>
            <h2 className={classes.descriptionMain}>
              {weather.weather[0].description}
            </h2>
            <h2 className={classes.max}>Max: {weather.main.temp_max} ℃</h2>
            <h2 className={classes.min}>Min: {weather.main.temp_min} ℃</h2>
          </div>

          <img
            className={classes.weatherImage}
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          />

          <h2 className={classes.timezone}>Timezone: {weather.timezone}</h2>

          <h2 className={classes.feelsLike}>
            Feels Like: {weather.main.feels_like} ℃
          </h2>
        </div>
      )}
      {typeof weather.main !== "undefined" && (
        <div className={classes.weatherDesc}>
          <div className={classes.weatherDescBox}>
            <p>Wind status:</p>
            <h2>{weather.wind.speed}mph</h2>
          </div>
          <div className={classes.weatherDescBox}>
            <p>Visibility:</p>
            <h2>{weather.visibility} mi</h2>
          </div>
          <div className={classes.weatherDescBox}>
            <p>Pressure:</p>
            <h2>{weather.main.pressure} mb</h2>
          </div>
          <div className={classes.weatherDescBox}>
            <p>Humidity:</p>
            <h2>{weather.main.humidity}%</h2>
          </div>
        </div>
      )}
    </section>
  );
};

export default Weather;
