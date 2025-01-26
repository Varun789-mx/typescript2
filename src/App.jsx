import React from "react";
import useWeatherData from "./Hooks/Getweather";
import WeatherDisplay from "./components/Graph";
import useStatus from "./components/Status";
import useMouse from "./Hooks/Mousepointer";

function App() {
  const weather = useWeatherData();
  const Online = useStatus();
  const position = useMouse();
  const weatherdata = {
    name: weather?.sys ? weather.name : "loading....",
    sys: weather?.sys ? weather.sys : "Loading...",
    main: {
      temp: weather?.main ? weather.main.temp : "Loading...",
      feels_like: weather?.main ? weather.main.feels_like : "Loading",
      humidity: weather?.main ? weather.main.humidity : "Loading...",
      pressure: weather?.main ? weather.main.pressure : "Loading...",
    },
    weather: [
      {
        id: weather?.weather ? weather.weather[0].id : "Loading....",
        description: weather?.weather
          ? weather.weather[0].description
          : "Loading",
        icon: weather?.weather ? weather.weather[0].icon : "Loading...",
      },
    ],
    wind: {
      speed: weather?.wind ? weather.wind.speed : "Loading....",
    },
    visibility: weather?.visibility ? weather.visibility : "Loading...",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          Status:{Online ? "Online" : "Offline"}
        </h1>
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          Weather Dashboard
        </h1>
        <div className="flex justify-center items-center">
          <WeatherDisplay weatherData={weatherdata} />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Mouse location : {position.x} {position.y}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;
