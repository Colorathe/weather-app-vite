import React, { useEffect } from "react";
import { useState } from "react";
import WeatherForm from "./WeatherForm";
import WeatherMainInfo from "./WeatherMainInfo";

import styles from "./weatherApp.module.css"
import Loader from "./Loader";
import Footer from "./Footer";


const WeatherApp = () => {
  const [weather, setWeather] = useState(null);

  const urlkey = import.meta.env.VITE_APP_URL_KEY;
  const url = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    loadInfo();
  }, []);

  useEffect(() => {
    document.title = `Weather | ${weather?.location.name ?? ""}`;
  }, [weather]);

  async function loadInfo(city = "Buenos Aires") {
    try {
      const request = await fetch(`${url}&key=${urlkey}&q=${city}`);
      const json = await request.json();

        setTimeout(() => {
            setWeather(json);
        }, 2000)

    } catch (error) {}
  }

  function handleChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }

  return (
    <>
      <div className={styles.weatherContainer}>
        <WeatherForm onChangeCity={handleChangeCity} />
        {weather ? <WeatherMainInfo weather={weather} /> : <Loader /> }
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default WeatherApp;
