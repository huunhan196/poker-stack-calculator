import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";
import {
  BiPlusCircle,
  BiMinusCircle,
  BiTrash,
  BiCheckCircle,
} from "react-icons/bi";
import {
  addBuyin,
  addTotal,
  removeRow,
  addPlayer,
  addBuyInUI,
  addTotalUI,
  adjustName,
  reduceBuyin,
} from "../store";
import { useEffect } from "react";

function TablePage() {
  const dispatch = useDispatch();
  const { arr, amountOfRate, numOfInputs } = useSelector((state) => {
    return {
      arr: state.form.arr,
      amountOfRate: state.form.amountOfRate,
      numOfInputs: state.form.numOfInputs,
    };
  });
  const { buyInUI, totalUI } = useSelector((state) => {
    return { buyInUI: state.table.buyInUI, totalUI: state.table.totalUI };
  });
  useEffect(() => {
    numOfInputs.forEach((_, i) =>
      dispatch(
        addPlayer({
          name: `Player ${i}`,
        })
      )
    );
  }, [dispatch, numOfInputs]);
  const handleBuyinSubmit = (player) => {
    if (buyInUI[player.id] >= 0) {
      dispatch(
        addBuyin({
          amount: buyInUI[player.id],
          id: player.id,
        })
      );
    }
  };

  const handleTotalSubmit = (player) => {
    if (totalUI[player.id] >= 0) {
      dispatch(
        addTotal({
          amount: totalUI[player.id],
          id: player.id,
        })
      );
    }
  };

  const config = [
    {
      label: "Name",
      render: (player) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="text-center w-20 p-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:scale-110"
            type="text"
            placeholder={player.name}
            onChange={(e) => {
              dispatch(adjustName({ name: e.target.value, id: player.id }));
              localStorage.setItem(
                `Name ${player.id}`,
                JSON.stringify(e.target.value)
              );
            }}
            value={player.name}
          />
        </form>
      ),
    },
    {
      label: "Buy-in (Chips)",
      render: (player) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleBuyinSubmit(player);
          }}
          className="flex flex-row justify-between items-center"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              if (player.buyin > 0) {
                dispatch(
                  reduceBuyin({
                    amount: buyInUI[player.id],
                    id: player.id,
                  })
                );
              }
            }}
          >
            <BiMinusCircle className="text-2xl mr-2 md:mr-0" />
          </button>
          <input
            type="text"
            className="text-center w-10 md:w-12 mr-2 md:mr-0 p-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:scale-110"
            onChange={(e) => {
              dispatch(addBuyInUI({ [player.id]: Number(e.target.value) }));
            }}
            value={buyInUI[player.id] || ""}
          ></input>
          <button type="submit">
            <BiPlusCircle className="text-2xl" />
          </button>
        </form>
      ),
    },
    {
      label: "Total Buy-in (Chips)",
      render: (player) => (
        <div className="tm-2 flex flex-row justify-center items-center text-gray-300">
          {player.buyin || ""}
        </div>
      ),
    },
    {
      label: "Total End (Chips)",
      render: (player) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTotalSubmit(player);
          }}
          className="m-2 flex flex-row justify-center items-center"
        >
          <input
            type="text"
            className="text-center w-12 md:w-16 mr-4 p-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:scale-110"
            onChange={(e) => {
              dispatch(addTotalUI({ [player.id]: Number(e.target.value) }));
            }}
            value={totalUI[player.id]}
          ></input>
          <button type="submit">
            <BiCheckCircle className="text-2xl" />
          </button>
        </form>
      ),
    },
    {
      label: "Remaining (Chips)",
      render: (player) => {
        const remaining = player.total - player.buyin;
        let color;
        switch (true) {
          case remaining > 0:
            color = "text-green-400";
            break;
          case remaining < 0:
            color = "text-red-400";
            break;
          case remaining === 0:
            color = "text-yellow-400";
            break;
          default:
            color = "";
        }
        return (
          <div
            className={`flex flex-row justify-center items-center font-bold text-md text-gray-300 ${color}`}
          >
            {player.total >= 0 ? player.total - player.buyin : ""}
          </div>
        );
      },
    },
    {
      label: "Balance (VND)",
      render: (player) => {
        const balance = Math.round(
          ((player.total - player.buyin) * amountOfRate) / 1000
        );
        let color;
        switch (true) {
          case balance > 0:
            color = "text-green-400";
            break;
          case balance < 0:
            color = "text-red-400";
            break;
          case balance === 0:
            color = "text-yellow-400";
            break;
          default:
            color = "";
        }
        return (
          <div
            className={`flex flex-row justify-center items-center font-bold text-md ${color}`}
          >
            {player.total >= 0
              ? `${Math.round(
                  ((player.total - player.buyin) * amountOfRate) / 1000
                )}k`
              : ""}
          </div>
        );
      },
    },
    {
      label: "",
      render: (player) => (
        <div>
          <BiTrash
            className="text-xl cursor-pointer"
            onClick={() => dispatch(removeRow(player.id))}
          />
        </div>
      ),
    },
  ];

  const keyFn = (player) => player.id;

  return <Table data={arr} config={config} keyFn={keyFn} />;
}

export default TablePage;
