import React, { useState, useEffect } from 'react';
import axios from 'axios';
import weatherStyle from './Weather.module.css';
import weatherTranslations from './weatherTranslations.json';
import {LoadingSpiner} from "../../components/common/other/LoadingSpiner";
import {LocationCity, LocationOn, MyLocation} from "@mui/icons-material";

function Weather() {
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    desc: '',
    icon: '',
    loading: true,
    locationName: '',
    max:0,
    min:0
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
          const locationName = data.name;
          const max = data.main.temp_max;
          const min = data.main.temp_min;
          console.log(max)

          setWeatherData({
            temp: data.main.temp,
            desc: translatedDesc,
            icon: data.weather[0].icon,
            loading: false,
            locationName: locationName,
            max:max,
            min:min
          });
        })
        .catch((error) => console.log(error));
    });
  }, []);

  const imgSrc = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  if (weatherData.loading) {
    return <LoadingSpiner/>;
  } else {
    return (
      <div className={weatherStyle.weatherContainer}>
        <h3>오늘 날씨</h3>
        <div className={weatherStyle.flex}>
          <div>
            <img src={imgSrc} alt="Weather Icon" className={weatherStyle.weatherIcon}/>
          </div>
          <div className={weatherStyle.weather_content}>
            <p><LocationOn/> {weatherData.locationName}</p>
            <div className={weatherStyle.weather}>
              <p className={weatherStyle.temperature}>{(weatherData.temp).toFixed(1)}°C</p>
              <div>
                <span>{(weatherData.max).toFixed(0)}°C</span>
                /
                <span>{(weatherData.min).toFixed(0)}°C</span>
              </div>
            </div>
            <div>
              {weatherData.desc}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
