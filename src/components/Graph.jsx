import React from "react";

const WeatherDisplay = ({ weatherData }) => {
  const msToMph = (ms) => Math.round(ms * 2.237);
 
  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-100">
              {weatherData.name}, {weatherData.sys.country}
            </h1>
            <div className="mt-4 flex flex-col items-center">
              {weatherData.weather[0].icon && (
                <img
                  src={getWeatherIcon(weatherData.weather[0].icon)}
                  alt={weatherData.weather[0].description}
                  className="w-24 h-24 mb-2"
                />
              )}
              <span className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                {Math.round(weatherData.main.temp - (273.15).toFixed(1))}°C
              </span>
              <p className="text-gray-400 mt-2 text-lg capitalize">
                {weatherData.weather[0].description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50">
              <div className="text-center">
                <p className="text-gray-400">Humidity</p>
                <p className="text-2xl font-semibold text-gray-100">
                  {weatherData.main.humidity}%
                </p>
              </div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50">
              <div className="text-center">
                <p className="text-gray-400">Wind</p>
                <p className="text-2xl font-semibold text-gray-100">
                  {msToMph(weatherData.wind.speed)} mph
                </p>
              </div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50">
              <div className="text-center">
                <p className="text-gray-400">Pressure</p>
                <p className="text-2xl font-semibold text-gray-100">
                  {weatherData.main.pressure} hPa
                </p>
              </div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50">
              <div className="text-center">
                <p className="text-gray-400">Visibility</p>
                <p className="text-2xl font-semibold text-gray-100">
                  {weatherData.visibility / 1000} km
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
