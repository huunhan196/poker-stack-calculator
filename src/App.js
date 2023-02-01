import ModalPage from "./pages/ModalPage";
import TablePage from "./pages/TablePage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { reset, resetStats } from "./store";

function App() {
  const localKey = [
    "numOfPlayers",
    "player",
    "buyInUI",
    "totalUI",
    "amountOfRate",
    "isOpen",
  ];
  const removeLocalKey = (key) => {
    localStorage.removeItem(key);
  };
  const dispatch = useDispatch();
  const defaultState =
    localStorage.getItem("isOpen") !== null
      ? JSON.parse(localStorage.getItem("isOpen"))
      : true;
  const [isOpen, setIsOpen] = useState(defaultState);
  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("isOpen", JSON.stringify(false));
  };
  const handleResetAll = () => {
    dispatch(reset());
    setIsOpen(true);
    localKey.forEach((key) => removeLocalKey(key));
    Object.keys(localStorage)
      .filter((x) => x.startsWith("Name"))
      .forEach((x) => removeLocalKey(x));
  };
  const handleResetStats = () => {
    dispatch(resetStats());
    removeLocalKey("buyInUI");
    removeLocalKey("totalUI");
  };
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-gray-300 tracking-widest font-bold uppercase text-2xl mb-6 mt-6">
          Poker Stack Calculator
        </h1>
        <div className="flex flex-row">
          {!isOpen && (
            <button
              onClick={handleResetAll}
              className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none"
            >
              <span className="text-gray-300 relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Start Over
              </span>
            </button>
          )}
          <button
            onClick={handleResetStats}
            className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none "
          >
            <span className="text-gray-300 relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Reset Game
            </span>
          </button>
        </div>
      </div>
      <div>
        <ModalPage isOpen={isOpen} onClose={handleClose} />
        {!isOpen && <TablePage />}
      </div>
    </div>
  );
}

export default App;
