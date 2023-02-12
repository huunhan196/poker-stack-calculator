import ModalPage from "./pages/ModalPage";
import TablePage from "./pages/TablePage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { reset, resetStats, addPlayer } from "./store";

function App() {
  const handleMouseOver = (e) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iterations = 0;
    const interval = setInterval(() => {
      e.target.innerText = e.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iterations) {
            return e.target.dataset.value[index];
          }

          if (letter === " ") return " ";

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      if (iterations >= e.target.dataset.value.length) clearInterval(interval);

      iterations += 1;
    }, 40);
  };

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
  const handleAddPlayer = () => {
    dispatch(
      addPlayer({
        name: `Player +`,
      })
    );
  };
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1
          onMouseOver={handleMouseOver}
          data-value="POKER STACK CALCULATOR"
          className="font-mono text-center text-gray-300 tracking-widest font-bold uppercase text-2xl sm:text-3xl mb-4 mt-6"
        >
          Poker Stack Calculator
        </h1>
        <div className="flex gap-2">
          {!isOpen && (
            <>
              <button
                onClick={handleResetAll}
                className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-orange-400 group-hover:from-purple-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:outline-none"
              >
                <span className="text-gray-300 relative px-2 sm:px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Start Over
                </span>
              </button>

              <button
                onClick={handleAddPlayer}
                className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:outline-none"
              >
                <span className="text-gray-300 relative px-2 sm:px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Add Player
                </span>
              </button>

              <button
                onClick={handleResetStats}
                className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none "
              >
                <span className="text-gray-300 relative px-2 sm:px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Reset Game
                </span>
              </button>
            </>
          )}
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
