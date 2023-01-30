import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { BiPlusCircle, BiTrash, BiCheckCircle } from "react-icons/bi";
import { addBuyin, addTotal, removeRow, addPlayer } from "../store";
import { useState, useEffect } from "react";

function TablePage() {
  const [buyin, setBuyin] = useState({});
  const [total, setTotal] = useState({});
  const dispatch = useDispatch();
  const { arr, amountOfRate, numOfInputs } = useSelector((state) => {
    return {
      arr: state.form.arr,
      amountOfRate: state.form.amountOfRate,
      numOfInputs: state.form.numOfInputs,
    };
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
    if (buyin[player.id] >= 0) {
      dispatch(
        addBuyin({
          amount: buyin[player.id],
          id: player.id,
        })
      );
    }
    console.log(typeof buyin[player.id]);
    // setBuyin({ ...buyin, [player.id]: 0 });
  };

  const handleTotalSubmit = (player) => {
    if (total[player.id] >= 0) {
      dispatch(
        addTotal({
          amount: total[player.id],
          id: player.id,
        })
      );
    }
  };

  const config = [
    {
      label: "Name",
      render: (player) => (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="w-20 p-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:scale-110"
            type="text"
            placeholder={player.name}
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
          className="m-2 flex flex-row items-center"
        >
          <input
            type="text"
            className="w-10 sm:w-1/4 mr-2 p-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:scale-110"
            onChange={(e) => {
              setBuyin({ ...buyin, [player.id]: Number(e.target.value) });
            }}
          ></input>
          <button type="submit">
            <BiPlusCircle className="text-xl" />
          </button>
        </form>
      ),
    },
    {
      label: "Total Buy-in (Chips)",
      render: (player) => player.buyin,
    },
    {
      label: "Total End (Chips)",
      render: (player) => (
        <div className="w-1/2 flex flex-row justify-start items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTotalSubmit(player);
            }}
            className="m-2 flex flex-row items-center"
          >
            <input
              type="text"
              className="w-12 sm:w-full mr-2 p-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:scale-110"
              onChange={(e) => {
                setTotal({ ...total, [player.id]: Number(e.target.value) });
              }}
            ></input>
            <button type="submit">
              <BiCheckCircle className="text-xl" />
            </button>
          </form>
        </div>
      ),
    },
    {
      label: "Remaining (Chips)",
      render: (player) => (
        <div>{player.total >= 0 ? player.total - player.buyin : ""}</div>
      ),
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
          <div className={`font-bold text-md ${color}`}>
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
