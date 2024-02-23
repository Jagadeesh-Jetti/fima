import axios from "axios";
import {
  ADD_ENTRY,
  FETCH_EXPENSE,
  FETCH_INCOME,
  FETCH_SAVING,
} from "./actionTypes";

const baseUrl = "https://financial-management-backend-five.vercel.app";

export const GetIncomeData = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/incomes`);
    dispatch({ type: FETCH_INCOME, payload: data });
  } catch (error) {
    console.error("Error while fetching the income data", error);
  }
};

export const GetExpensesData = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/expenses`);
    dispatch({ type: FETCH_EXPENSE, payload: data });
  } catch (error) {
    console.error("Error while fetching the expenses data", error);
  }
};

export const GetSavingsData = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/savings`);
    dispatch({ type: FETCH_SAVING, payload: data });
  } catch (error) {
    console.error("Error while fetching the savings data", error);
  }
};

export const AddEntry = (entry) => async (dispatch) => {
  try {
    let url = "";
    if (entry.entryType === "income") {
      url = `${baseUrl}/incomes`;
    } else if (entry.entryType === "expense") {
      url = `${baseUrl}/expenses`;
    } else {
      url = `${baseUrl}/savings`;
    }
    const { data } = await axios.post(url, entry, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: ADD_ENTRY, payload: data });
  } catch (error) {
    console.error("Error while adding entry", error);
  }
};

// export const generateExpenseBreakdown = (expenses) => {
//   const categories = {};

//   expenses.forEach((expense) => {
//     if (categories[expense.category]) {
//       categories[expense.category] += expense.amount;
//     } else {
//       categories[expense.category] = expense.amount;
//     }
//   });

//   const expenseBreakdown = Object.entries(categories).map(
//     ([category, totalAmount]) => ({
//       category,
//       totalAmount,
//     })
//   );

//   return expenseBreakdown;
// };
