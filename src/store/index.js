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
} from "./slices/formSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
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
};
