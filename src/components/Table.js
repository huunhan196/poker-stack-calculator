import { Fragment } from "react";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addPlayer } from "../store";
function Table({ data, config, keyFn }) {
  const { arr } = useSelector((state) => {
    return { arr: state.form.arr };
  });
  const dispatch = useDispatch();
  const handleAddPlayer = () => {
    dispatch(
      addPlayer({
        name: `Player +`,
      })
    );
  };
  const sum = arr.reduce((acc, a) => {
    if (typeof a.total === "undefined") return acc;
    return acc + (a.total - a.buyin);
  }, 0);
  let color;
  switch (true) {
    case sum > 0:
      color = "text-green-400";
      break;
    case sum < 0:
      color = "text-red-400";
      break;
    case sum === 0:
      color = "text-yellow-400";
      break;
    default:
      color = "";
  }

  const renderedHeader = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return (
      <th scope="col" className="px-6 py-3" key={column.label}>
        <div className="flex flex-row items-center">
          {column.label === "Remaining (Chips)" && (
            <div className={`mr-2 text-base ${color}`}>{sum}</div>
          )}
          <div className="mr-2">{column.label}</div>
          {column.label === "Name" && (
            <span>
              <BiPlus
                onClick={handleAddPlayer}
                className="text-xl cursor-pointer"
              />
            </span>
          )}
        </div>
      </th>
    );
  });

  const renderedRow = data.map((player) => {
    const renderedCells = config.map((column) => {
      return (
        <td className="px-6 py-4" key={column.label}>
          {column.render(player)}
        </td>
      );
    });

    return (
      <tr
        key={keyFn(player)}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:brightness-125 transition ease-in-out"
      >
        {renderedCells}
      </tr>
    );
  });

  return (
    <div className="m-5 sm:m-8 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>{renderedHeader}</tr>
        </thead>
        <tbody>{renderedRow}</tbody>
      </table>
    </div>
  );
}

export default Table;
