import { Fragment } from "react";
import { useSelector } from "react-redux";

function Table({ data, config, keyFn }) {
  const { arr } = useSelector((state) => {
    return { arr: state.form.arr };
  });
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
        <div className={`flex flex-row justify-center items-center`}>
          {column.label === "Remaining (Chips)" && (
            <div className={`mr-2 text-base ${color}`}>{sum}</div>
          )}
          <div>{column.label}</div>
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
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
          <tr>{renderedHeader}</tr>
        </thead>
        <tbody>{renderedRow}</tbody>
      </table>
    </div>
  );
}

export default Table;
