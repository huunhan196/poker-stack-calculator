import { createSlice } from "@reduxjs/toolkit";
import { reset, resetStats } from "./formSlice";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    buyInUI: {},
    totalUI: {},
  },
  reducers: {
    addBuyInUI(state, action) {
      state.buyInUI = { ...state.buyInUI, ...action.payload };
    },
    addTotalUI(state, action) {
      state.totalUI = { ...state.totalUI, ...action.payload };
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
