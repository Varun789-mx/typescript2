import { useEffect, useState } from "react";
import axios from "axios";

function useWeatherData() {
  const API_KEY = "fa12448144c986459f4f4e70d05ec7e4";

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
