import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetExpensesData } from "../../utils/actions";
import "../Income/income.css";

export const Expenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);

  const [sortByAmount, setSortByAmount] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const uniqueCategories = expenses.reduce(
    (acc, expense) =>
      acc.includes(expense.category) ? acc : [...acc, expense.category],
    []
  );

  const totalExpense = expenses.reduce((acc, cur) => cur.amount + acc, 0);

  const handleCheckboxChange = () => {
    setSortByAmount((prevValue) => !prevValue);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  const sortedExpenses = sortByAmount
    ? [...filteredExpenses].sort((a, b) => b.amount - a.amount)
    : filteredExpenses;

  useEffect(() => {
    dispatch(GetExpensesData());
  }, [dispatch]);

  return (
    <div className="global-div">
      {expenses?.length === 0 ? (
        <p className="no-data-message"> Loadinggg... </p>
      ) : (
        <>
          <h3 className="page-heading"> Expenses </h3>
          <p className="total"> Total Expenses: ₹ {totalExpense} </p>
          <div className="filter-div">
            <div className="filter_format_div">
              <div className="income_sort_div">
                <div className="filter_title">Filter:</div>
                <div className="checkbox_and_label">
                  <input
                    type="checkbox"
                    checked={sortByAmount}
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                  <label className="checkbox-label">Sort amount</label>
                </div>
              </div>
              <div className="filter_format_div">
                <div className="filter_title">Filter By Category</div>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="category-select"
                >
                  <option value="">All Categories</option>
                  {uniqueCategories.map((expense) => (
                    <option key={expense} value={expense}>
                      {expense}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="table-div">
            <table className="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {sortedExpenses.map((expense) => (
                  <tr key={expense._id}>
                    <td> {expense.description} </td>
                    <td> {expense.category} </td>
                    <td>
                      {new Date(expense.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td> ₹ {expense.amount} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
