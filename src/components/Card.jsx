import React from 'react';

const WeatherCard = ({ weatherData }) => {
  const { temperature, description, icon } = weatherData;

  return (
    
    <div className="max-w-sm w-full max-h-screen p-4 bg-blue-100 rounded-lg shadow-lg flex flex-col items-center justify-center">
      <img
        src={`http://openweathermap.org/img/wn/${icon}.png`}
        alt={description}
        className="w-16 h-16 mb-4"
      />
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-gray-800">{temperature}°C</h2>
        <p className="text-lg text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
