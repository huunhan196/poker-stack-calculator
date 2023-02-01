import { createSlice, nanoid } from "@reduxjs/toolkit";

const numOfPlayers =
  localStorage.getItem("numOfPlayers") !== null
    ? JSON.parse(localStorage.getItem("numOfPlayers"))
    : 0;
const amountOfRate =
  localStorage.getItem("amountOfRate") !== null
    ? JSON.parse(localStorage.getItem("amountOfRate"))
    : 0;
const arr =
  localStorage.getItem("player") !== null
    ? JSON.parse(localStorage.getItem("player"))
    : [];

const formSlice = createSlice({
  name: "form",
  initialState: {
    numOfPlayers: numOfPlayers,
    numOfInputs: [],
    amountOfRate: amountOfRate,
    arr: arr,
  },
  reducers: {
    adjustName(state, action) {
      const updatedName = state.arr.map((player) => {
        if (player.id === action.payload.id) {
          return { ...player, name: action.payload.name };
        }

        return player;
      });

      state.arr = updatedName;
      localStorage.setItem(
        "player",
        JSON.stringify(state.arr.map((player) => player))
      );
    },

    reset(state) {
      state.numOfPlayers = 0;
      state.numOfInputs = [];
      state.amountOfRate = 0;
      state.arr = [];
    },
    resetStats(state) {
      const updatedStats = state.arr.map((player) => {
        return { ...player, buyin: 0, total: undefined };
      });

      state.arr = updatedStats;
    },
    changeNumPlayer(state, action) {
      state.numOfPlayers = action.payload;
      localStorage.setItem("numOfPlayers", JSON.stringify(state.numOfPlayers));
    },
    changeRate(state, action) {
      state.amountOfRate = action.payload;
      localStorage.setItem("amountOfRate", JSON.stringify(state.amountOfRate));
    },
    changeInput(state, action) {
      state.numOfInputs = action.payload;
    },
    addPlayer(state, action) {
      state.arr.push({
        name: action.payload.name,
        buyin: 0,
        total: undefined,
        id: nanoid(),
      });
      localStorage.setItem(
        "player",
        JSON.stringify(state.arr.map((player) => player))
      );
    },
    addBuyin(state, action) {
      const updatedBuyin = state.arr.map((player) => {
        if (player.id === action.payload.id) {
          return { ...player, buyin: player.buyin + action.payload.amount };
        }

        return player;
      });

      state.arr = updatedBuyin;
      localStorage.setItem(
        "player",
        JSON.stringify(state.arr.map((player) => player))
      );
    },
    reduceBuyin(state, action) {
      const updatedBuyin = state.arr.map((player) => {
        if (player.id === action.payload.id) {
          return { ...player, buyin: player.buyin - action.payload.amount };
        }

        return player;
      });

      state.arr = updatedBuyin;
      localStorage.setItem(
        "player",
        JSON.stringify(state.arr.map((player) => player))
      );
    },
    addTotal(state, action) {
      const updatedTotal = state.arr.map((player) => {
        if (player.id === action.payload.id) {
          return { ...player, total: action.payload.amount };
        }

        return player;
      });

      state.arr = updatedTotal;
      localStorage.setItem(
        "player",
        JSON.stringify(state.arr.map((player) => player))
      );
    },
    removeRow(state, action) {
      const updated = state.arr.filter(
        (player) => player.id !== action.payload
      );
      state.arr = updated;
      localStorage.setItem(
        "player",
        JSON.stringify(state.arr.map((player) => player))
      );
    },
  },
});

export const {
  changeNumPlayer,
  changeInput,
  changeRate,
  addPlayer,
  addBuyin,
  removeRow,
  addTotal,
  reset,
  resetStats,
  adjustName,
  reduceBuyin,
} = formSlice.actions;
export const formReducer = formSlice.reducer;
