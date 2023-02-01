import ModalPage from "./pages/ModalPage";
import TablePage from "./pages/TablePage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { reset, resetStats } from "./store";

function App() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);
  const handleResetAll = () => {
    dispatch(reset());
    setIsOpen(true);
  };
  const handleResetStats = () => {
    dispatch(resetStats());
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
                Reset All
              </span>
            </button>
          )}
          <button
            onClick={handleResetStats}
            className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none "
          >
            <span className="text-gray-300 relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Reset Stats
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
