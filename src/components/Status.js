import { useEffect, useState } from "react";

function useStatus() {
  const [Online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    window.addEventListener('onLine',()=>console.log("Online"));
    window.addEventListener('offLine',()=>console.log("offline"));
    if (!navigator.onLine) {
      setOnline(false);
      console.log("Offline")
    } else {
      setOnline(true);
      console.log("Online")
    }
  }, [Online]);

  return Online;
}
export default useStatus;
