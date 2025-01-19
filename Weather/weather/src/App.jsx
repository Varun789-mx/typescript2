import { useState } from "react";

import { Inputbox } from "./Components/Inputfield";
import { useCurrencyInfo } from "./hooks/Currencyhook";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setfrom] = useState("usd");
  const [To, setTo] = useState("inr");
  const [convertedAmount, setconvertedAmount] = useState(0);
  const Currencyinfo = useCurrencyInfo(from);

  const Options = Object.keys(Currencyinfo || {});
  const swap = () => {
    setfrom(To);
    setTo(from);
    setconvertedAmount(amount);
    setAmount(convertedAmount);
  };
  function Exchange() {
    setconvertedAmount(amount * Currencyinfo[To] || 0);
  }
  return (
    <div
      className="w-full h-screen flex  flex-wrap 
    justify-center items-center bg-cover bg-no-repeat "
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/421927/pexels-photo-421927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Exchange();
            }}
          >
            <div className="w-full mb-1 ">
              <Inputbox
                label="From"
                amount={amount}
                CurrencyOption={Options}
                onCurrencyChange={(value) => setfrom(value)}
                SelectedCurrency={from}
                onAmountChange={(value) => setAmount(value)} 
            
              />
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4 ">
              <Inputbox
                label="To"
                amount={convertedAmount}
                CurrencyOption={Options}
                onCurrencyChange={(value) => setTo(value)}
                SelectedCurrency={To}
                AmounrDisable={true}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white  px-4 py-3 rounded-lg "
            >
              Convert {`${To.toUpperCase()} to ${from.toUpperCase()}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
