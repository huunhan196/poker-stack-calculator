import { useDispatch, useSelector } from "react-redux";
import { changeNumPlayer, changeInput, changeRate } from "../store";
import { BsFillPersonFill } from "react-icons/bs";

function InputForm({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { numOfPlayers, amountOfRate } = useSelector((state) => {
    return {
      numOfPlayers: state.form.numOfPlayers,
      amountOfRate: state.form.amountOfRate,
    };
  });

  const handlePlayerChange = (e) => {
    dispatch(changeNumPlayer(e.target.value));
    const generateArrays = Array.from(Array(Number(e.target.value)).keys());
    dispatch(changeInput(generateArrays));
  };

  const handleRateChange = (e) => {
    dispatch(changeRate(Number(e.target.value)));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full py-12 rounded-lg"
    >
      <h2 className="px-20 text-center sm:text-3xl text-4xl text-gray-700 mb-12">
        Texas Hold'em
      </h2>

      <div className="w-60 mb-2">
        <div className="mb-12 flex flex-row justify-between items-center">
          <label className="mb-2 font-medium">Number of players:</label>
          <input
            type="number"
            placeholder="No. of players"
            className="px-2 rounded-lg w-1/4 border bg-slate-100 py-2 text-gray-700 focus:outline-none"
            min={2}
            max={10}
            onChange={handlePlayerChange}
            value={numOfPlayers || ""}
            required
          />
          <BsFillPersonFill className="text-xl text-gray-700" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-between items-center">
            <label className="mr-2 font-medium">Rate:</label>
            <p>1 White =</p>
            <input
              type="number"
              placeholder="Amt."
              className="px-2 w-1/3 mr-2 bg-slate-100 border rounded-lg py-2 text-gray-700 focus:outline-none"
              min={25}
              step={25}
              max={5000}
              onChange={handleRateChange}
              value={amountOfRate || ""}
              required
            />
            <span>VND</span>
          </div>
        </div>
      </div>
      <button className="w-60 mt-6 py-2 text-gray-100 bg-gradient-to-r from-gray-900 to-gray-600 hover:bg-gradient-to-br focus:outline-none rounded text-md text-center">
        Start Game!
      </button>
    </form>
  );
}

export default InputForm;
