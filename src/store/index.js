import { configureStore } from "@reduxjs/toolkit";
import {
  formReducer,
  changeNumPlayer,
  changeInput,
  changeRate,
  addPlayer,
  addBuyin,
  removeRow,
  addTotal,
  reset,
  resetStats,
} from "./slices/formSlice";
import { addBuyInUI, addTotalUI, tableReducer } from "./slices/tableSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    table: tableReducer,
  },
});

export {
  store,
  changeNumPlayer,
  changeInput,
  changeRate,
  addPlayer,
  addBuyin,
  removeRow,
  addTotal,
  reset,
  resetStats,
  addBuyInUI,
  addTotalUI,
};
