import React, { useState, useEffect } from 'react';
import axios from 'axios';
import weatherStyle from './Weather.module.css';
import weatherTranslations from './weatherTranslations.json';

function Weather() {
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    desc: '',
    icon: '',
    loading: true,
  });

  useEffect(() => {
    // 현재 위치 정보를 얻기 위해 geolocation 사용
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = process.env.REACT_APP_WEATHER_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      axios
        .get(url)
        .then((responseData) => {
          const data = responseData.data;
          const weatherDesc = data.weather[0].description;
          const translatedDesc = weatherTranslations[weatherDesc] || weatherDesc;
          setWeatherData({
            temp: data.main.temp,
            desc: translatedDesc,
            icon: data.weather[0].icon,
            loading: false,
          });
        })
        .catch((error) => console.log(error));
    });
  }, []);

  const imgSrc = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  if (weatherData.loading) {
    return <p>Loading</p>;
  } else {
    return (
      <div className={weatherStyle.weatherContainer}>
        <div className={weatherStyle.temperature}>
          날씨: {(weatherData.temp).toFixed(1)}°C
        </div>
        <div>
          <img src={imgSrc} alt="Weather Icon" className={weatherStyle.weatherIcon}/>
        </div>
        <div>
          {weatherData.desc}
        </div>
      </div>
    );
  }
}

export default Weather;
