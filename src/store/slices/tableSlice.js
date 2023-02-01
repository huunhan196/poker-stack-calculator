import { createSlice } from "@reduxjs/toolkit";
import { reset, resetStats } from "./formSlice";

const buyInUI =
  localStorage.getItem("buyInUI") !== null
    ? JSON.parse(localStorage.getItem("buyInUI"))
    : {};
const totalUI =
  localStorage.getItem("totalUI") !== null
    ? JSON.parse(localStorage.getItem("totalUI"))
    : {};

const tableSlice = createSlice({
  name: "table",
  initialState: {
    buyInUI: buyInUI,
    totalUI: totalUI,
  },
  reducers: {
    addBuyInUI(state, action) {
      state.buyInUI = { ...state.buyInUI, ...action.payload };
      localStorage.setItem("buyInUI", JSON.stringify(state.buyInUI));
    },
    addTotalUI(state, action) {
      state.totalUI = { ...state.totalUI, ...action.payload };
      localStorage.setItem("totalUI", JSON.stringify(state.totalUI));
    },
  },
  extraReducers(builder) {
    builder.addCase(resetStats, (state) => {
      state.buyInUI = {};
      state.totalUI = {};
    });
    builder.addCase(reset, (state) => {
      state.buyInUI = {};
      state.totalUI = {};
    });
  },
});

export const { addBuyInUI, addTotalUI } = tableSlice.actions;
export const tableReducer = tableSlice.reducer;
