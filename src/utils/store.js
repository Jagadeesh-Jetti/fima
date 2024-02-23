import { createStore, applyMiddleware } from "redux";
// import { createStore } from "redux";
import { thunk } from "redux-thunk";
import { financialReducer } from "./financialReducer";

export const store = createStore(financialReducer, applyMiddleware(thunk));
