import { useEffect, useState } from "react";
import axios from "axios";

function useWeatherData() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const lat = "28.6295";
  const lon = "77.3123";
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return data;
}

export default useWeatherData;
