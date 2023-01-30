import { createSlice, nanoid } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    numOfPlayers: 0,
    numOfInputs: [],
    amountOfRate: 0,
    arr: [],
  },
  reducers: {
    reset(state) {
      state.numOfPlayers = 0;
      state.numOfInputs = [];
      state.amountOfRate = 0;
      state.arr = [];
    },
    changeNumPlayer(state, action) {
      state.numOfPlayers = action.payload;
    },
    changeRate(state, action) {
      state.amountOfRate = action.payload;
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
    },
    addBuyin(state, action) {
      const updatedBuyin = state.arr.map((player) => {
        if (player.id === action.payload.id) {
          return { ...player, buyin: player.buyin + action.payload.amount };
        }

        return player;
      });

      state.arr = updatedBuyin;
    },
    addTotal(state, action) {
      const updatedTotal = state.arr.map((player) => {
        if (player.id === action.payload.id) {
          return { ...player, total: action.payload.amount };
        }

        return player;
      });

      state.arr = updatedTotal;
    },
    removeRow(state, action) {
      const updated = state.arr.filter(
        (player) => player.id !== action.payload
      );
      state.arr = updated;
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
} = formSlice.actions;
export const formReducer = formSlice.reducer;
