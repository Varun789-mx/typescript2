import { useEffect, useState } from "react";

function useMouse() {
  const [Cordinate, setCordinate] = useState({ x: 0, y: 0 });
  const Handlemouse = (e) => {
    setCordinate({ x: e.clientX, y: e.clientY });
  };
  useEffect(() => {
    window.addEventListener("mousemove", Handlemouse);

    return () => {
      window.removeEventListener("mousemove", Handlemouse);
    };
  }, []);
  return Cordinate;
}

export default useMouse;