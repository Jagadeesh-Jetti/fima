import {
  FETCH_EXPENSE,
  FETCH_INCOME,
  FETCH_SAVING,
  SORT_EXPENSE,
  SORT_INCOME,
  SORT_SAVING,
} from "./actionTypes";

export const initialState = {
  income: [],
  expenses: [],
  savings: [],
};

export const financialReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_INCOME:
      return {
        ...state,
        income: payload,
      };
    case FETCH_EXPENSE:
      return {
        ...state,
        expenses: payload,
      };
    case FETCH_SAVING:
      return {
        ...state,
        savings: payload,
      };
    case SORT_INCOME:
      if (payload === "HTL") {
        return {
          ...state,
          income: state.income
            .filter((item) => item.amount > 0)
            .sort((a, b) => b.amount - a.amount),
        };
      } else if (payload === "LTH") {
        return {
          ...state,
          income: state.income.sort((a, b) => a.amount - b.amount),
        };
      } else {
        return state;
      }
    case SORT_EXPENSE:
      return {
        ...state,
        expenses: payload,
      };
    case SORT_SAVING:
      return {
        ...state,
        savings: payload,
      };
    default:
      return state;
  }
};
