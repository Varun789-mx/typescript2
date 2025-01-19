import React from "react";
import useWeatherData from "./Hooks/Getweather";
import WeatherCard from "./components/Card";

function App() {
  const weather = useWeatherData();
  const weatherdata = {
    temperature: weather?.main
      ? (weather.main.temp - 273.15).toFixed(1)
      : "Loading....",
    description: weather?.weather ? weather.weather[0].description : "Loading...",
    icon: weather?.weather ? weather.weather[0].icon : "Loading",
  };

  return (
    <>
      <WeatherCard
        weatherData={weatherdata}
      />
    </>
  );
}
export default App;